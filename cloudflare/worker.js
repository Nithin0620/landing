/**
 * Cloudflare Worker for Live Status, Visitor Intelligence & Daily Resend Reports
 * 
 * Bindings:
 * - STATUS_KV: KV Namespace for live status and throttling
 * - DB: D1 Database for persistent analytics & visit history
 * - TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID: Telegram notifications
 * - RESEND_API_KEY: Resend API Key for sending reports
 * - REPORT_FROM: Sender email address
 * - REPORT_TO: Recipient email address
 * - AUTH_SECRET: Daemon authentication token
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Safe HTML escaping for Telegram notifications
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Convert UTC date to formatted IST string (Asia/Kolkata)
function getISTDateString(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
      hour12: true,
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

// Fallback status
const DEFAULT_STATUS = {
  task: 'Exploring new ideas & building creative web experiences',
  category: 'Full Stack',
  state: 'active',
  updated_at: new Date().toISOString(),
  hardware: {
    cpu_percent: 18.5,
    cpu_history: [12, 14, 20, 16, 25, 18, 15, 22, 19, 18],
    ram_used_gb: 6.8,
    ram_total_gb: 16.0,
    battery: 92,
    is_charging: true,
    uptime: '1d 8h',
  },
  agent: {
    name: 'Hermes',
    model: 'Hermes 3 / Local',
    tasks_today: 5,
  },
  context: {
    project: 'landing',
    branch: 'main',
    music: 'Lofi Focus Beats',
  },
  waves_count: 0,
};

async function sendTelegramNotification(env, messageHtml) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  try {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: messageHtml,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error('Telegram notification error:', errText);
    }
  } catch (err) {
    console.error('Failed to send Telegram notification:', err);
  }
}

// Send Email via Resend API
async function sendResendEmail(env, { to, from, subject, html }) {
  if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not configured');
    return { error: 'No RESEND_API_KEY' };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from || env.REPORT_FROM || 'Landing & Portfolio <noreply@splitwise.ssh.net.in>',
        to: Array.isArray(to) ? to : [to || env.REPORT_TO || 'nithin30302@gmail.com'],
        subject,
        html,
      }),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error('Failed to send Resend email:', err);
    return { ok: false, error: err.message };
  }
}

// Build pseudo-JA3 / TLS fingerprint hash from CF TLS properties
function buildTlsFingerprint(cf) {
  if (!cf) return 'no-cf';
  const ciphers = cf.tlsClientCiphersSha1 || '';
  const extensions = cf.tlsClientExtensionsSha1 || '';
  const helloLen = cf.tlsClientHelloLength || '';
  const proto = cf.httpProtocol || '';
  const tlsVer = cf.tlsVersion || '';
  if (!ciphers && !extensions) return 'tls-std';
  return `${tlsVer}_${proto}_${ciphers.slice(0, 8)}_${extensions.slice(0, 8)}_${helloLen}`;
}

// Normalize site origin
function normalizeSite(site, origin, referer) {
  const target = site || origin || referer || '';
  if (/nithin\.ssh\.net\.in/i.test(target)) return 'nithin.ssh.net.in';
  if (/ssh\.net\.in/i.test(target)) return 'ssh.net.in';
  if (target) {
    try {
      return new URL(target).hostname;
    } catch {
      return target.replace(/^https?:\/\//i, '').split('/')[0];
    }
  }
  return 'ssh.net.in';
}

// Generate the HTML daily summary email
async function generateAndSendDailyReport(env) {
  if (!env.DB) {
    console.warn('D1 Database binding (DB) is missing; cannot generate daily report.');
    return;
  }

  // Today in IST (Asia/Kolkata) from midnight to now
  // In SQLite: datetime(visited_at, '+5 hours', '30 minutes')
  const istDateExpr = "datetime(visited_at, '+5 hours', '30 minutes')";
  const todayIST = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date()); // YYYY-MM-DD

  // Query site totals
  const siteTotalsResult = await env.DB.prepare(`
    SELECT site, COUNT(*) as total_views, COUNT(DISTINCT visitor_id) as unique_visitors
    FROM visits
    WHERE date(${istDateExpr}) = ?
    GROUP BY site
  `).bind(todayIST).all();

  // Query top referrers
  const referrersResult = await env.DB.prepare(`
    SELECT COALESCE(NULLIF(referrer, ''), 'Direct / None') as ref, COUNT(*) as count
    FROM visits
    WHERE date(${istDateExpr}) = ?
    GROUP BY ref
    ORDER BY count DESC
    LIMIT 5
  `).bind(todayIST).all();

  // Query individual visitor breakdown
  const visitorsResult = await env.DB.prepare(`
    SELECT 
      visitor_id,
      composite_id,
      ip,
      country,
      city,
      isp,
      user_agent,
      device_cores,
      device_memory,
      screen_res,
      local_identity,
      COUNT(*) as hits,
      GROUP_CONCAT(DISTINCT site) as sites,
      MIN(${istDateExpr}) as first_seen_ist,
      MAX(${istDateExpr}) as last_seen_ist
    FROM visits
    WHERE date(${istDateExpr}) = ?
    GROUP BY visitor_id
    ORDER BY hits DESC
    LIMIT 50
  `).bind(todayIST).all();

  const siteTotals = siteTotalsResult.results || [];
  const topReferrers = referrersResult.results || [];
  const visitors = visitorsResult.results || [];

  const totalHitsToday = siteTotals.reduce((acc, curr) => acc + (curr.total_views || 0), 0);
  const totalUniqueVisitors = visitors.length;

  const emailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f3f4f6; margin: 0; padding: 24px; }
      .container { max-width: 860px; margin: 0 auto; background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 28px; }
      h1 { font-size: 22px; color: #f97316; margin-top: 0; margin-bottom: 6px; }
      .subtitle { color: #9ca3af; font-size: 14px; margin-bottom: 24px; }
      .stats-grid { display: flex; gap: 16px; margin-bottom: 28px; }
      .stat-card { flex: 1; background: #1f2937; border-radius: 8px; padding: 16px; border: 1px solid #374151; }
      .stat-num { font-size: 26px; font-weight: bold; color: #fff; margin-top: 4px; }
      .stat-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; }
      h2 { font-size: 16px; color: #e5e7eb; border-bottom: 1px solid #374151; padding-bottom: 8px; margin-top: 28px; }
      table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 12px; }
      th { text-align: left; padding: 10px; background: #1f2937; color: #9ca3af; font-weight: 600; border-bottom: 1px solid #374151; }
      td { padding: 10px; border-bottom: 1px solid #1f2937; color: #d1d5db; vertical-align: top; }
      tr:hover td { background-color: #172033; }
      .badge { display: inline-block; background: #374151; color: #f97316; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-family: monospace; }
      .identity { color: #38bdf8; font-weight: 500; }
      .footer { margin-top: 32px; font-size: 12px; color: #6b7280; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>📊 Daily Visitor Intelligence Report</h1>
      <div class="subtitle">Report for <b>${todayIST} (IST)</b> &bull; Generated at ${getISTDateString()}</div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Visits Today</div>
          <div class="stat-num">${totalHitsToday}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Unique Visitors</div>
          <div class="stat-num">${totalUniqueVisitors}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Active Sites</div>
          <div class="stat-num">${siteTotals.length}</div>
        </div>
      </div>

      <h2>🌐 Visits By Site</h2>
      <table>
        <thead>
          <tr>
            <th>Site</th>
            <th>Total Hits</th>
            <th>Unique Visitors</th>
          </tr>
        </thead>
        <tbody>
          ${siteTotals.map(s => `
            <tr>
              <td><b>${s.site}</b></td>
              <td>${s.total_views}</td>
              <td>${s.unique_visitors}</td>
            </tr>
          `).join('')}
          ${siteTotals.length === 0 ? '<tr><td colspan="3">No visits recorded today yet.</td></tr>' : ''}
        </tbody>
      </table>

      <h2>👥 Unique Visitors Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Visitor / Identity</th>
            <th>Location & ISP</th>
            <th>IP Address</th>
            <th>Sites & Hits</th>
            <th>Hardware / Screen</th>
            <th>First & Last Seen (IST)</th>
          </tr>
        </thead>
        <tbody>
          ${visitors.map(v => {
            let identStr = '';
            if (v.local_identity) {
              try {
                const parsed = JSON.parse(v.local_identity);
                identStr = Object.entries(parsed).map(([k, val]) => `${k}: ${val}`).join(', ');
              } catch {
                identStr = v.local_identity;
              }
            }
            return `
            <tr>
              <td>
                <span class="badge">${v.visitor_id.substring(0, 16)}</span>
                ${identStr ? `<br><span class="identity">👤 ${identStr}</span>` : ''}
              </td>
              <td>
                <b>${v.city || 'Unknown'}, ${v.country || ''}</b><br>
                <span style="font-size:11px; color:#9ca3af;">${v.isp || 'Unknown ISP'}</span>
              </td>
              <td><code>${v.ip}</code></td>
              <td>
                <b>${v.hits} hits</b><br>
                <span style="font-size:11px; color:#9ca3af;">${v.sites || ''}</span>
              </td>
              <td style="font-size:11px;">
                ${v.screen_res ? `${v.screen_res}` : ''}
                ${v.device_cores ? ` &bull; ${v.device_cores} cores` : ''}
                ${v.device_memory ? ` &bull; ${v.device_memory}GB RAM` : ''}
              </td>
              <td style="font-size:11px; color:#9ca3af;">
                ${v.first_seen_ist ? v.first_seen_ist.split(' ')[1] : ''} - ${v.last_seen_ist ? v.last_seen_ist.split(' ')[1] : ''}
              </td>
            </tr>`;
          }).join('')}
          ${visitors.length === 0 ? '<tr><td colspan="6">No visitors recorded today.</td></tr>' : ''}
        </tbody>
      </table>

      <h2>🔗 Top Referrers</h2>
      <table>
        <thead>
          <tr>
            <th>Referrer</th>
            <th>Visits</th>
          </tr>
        </thead>
        <tbody>
          ${topReferrers.map(r => `
            <tr>
              <td><code>${r.ref}</code></td>
              <td>${r.count}</td>
            </tr>
          `).join('')}
          ${topReferrers.length === 0 ? '<tr><td colspan="2">No referrers recorded today.</td></tr>' : ''}
        </tbody>
      </table>

      <div class="footer">
        Automated Daily Visitor Report &bull; Dispatched via Resend & Cloudflare Workers &bull; ssh.net.in & nithin.ssh.net.in
      </div>
    </div>
  </body>
  </html>
  `;

  await sendResendEmail(env, {
    subject: `📈 Daily Visitor Report: ${totalHitsToday} visits (${todayIST})`,
    html: emailHtml,
  });
}

export default {
  // Cron trigger (11:59 PM IST daily)
  async scheduled(event, env, ctx) {
    ctx.waitUntil(generateAndSendDailyReport(env));
  },

  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // 1. GET /api/status - Publicly accessible cached status
      if (path === '/api/status' && request.method === 'GET') {
        let statusData = DEFAULT_STATUS;
        if (env.STATUS_KV) {
          const raw = await env.STATUS_KV.get('status', 'json');
          if (raw) statusData = raw;
          const waves = await env.STATUS_KV.get('waves_count');
          statusData.waves_count = waves ? parseInt(waves, 10) : 0;
        }

        const lastUpdated = new Date(statusData.updated_at).getTime();
        const now = Date.now();
        if (now - lastUpdated > 15 * 60 * 1000) {
          statusData.state = 'offline';
        }

        return new Response(JSON.stringify(statusData), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=30',
          },
        });
      }

      // 2. PUT /api/status - Authenticated update from local daemon
      if (path === '/api/status' && request.method === 'PUT') {
        const authHeader = request.headers.get('Authorization') || '';
        const token = authHeader.replace(/^Bearer\s+/i, '');

        if (env.AUTH_SECRET && token !== env.AUTH_SECRET) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const body = await request.json();
        body.updated_at = new Date().toISOString();

        if (env.STATUS_KV) {
          await env.STATUS_KV.put('status', JSON.stringify(body));
        }

        return new Response(JSON.stringify({ success: true, updated_at: body.updated_at }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 3. POST /api/wave - Visitor clicked "Send Wave 👋"
      if (path === '/api/wave' && request.method === 'POST') {
        let count = 1;
        if (env.STATUS_KV) {
          const rawCount = await env.STATUS_KV.get('waves_count');
          count = (rawCount ? parseInt(rawCount, 10) : 0) + 1;
          await env.STATUS_KV.put('waves_count', count.toString());
        }

        let body = {};
        try { body = await request.json(); } catch {}

        const clientIp = request.headers.get('CF-Connecting-IP') || 'Unknown IP';
        const clientCountry = request.headers.get('CF-IPCountry') || 'Unknown';
        const sourceSite = normalizeSite(body.site, body.origin, request.headers.get('Origin'));
        const istTime = getISTDateString();

        ctx.waitUntil(
          sendTelegramNotification(
            env,
            `👋 <b>New Wave on ${escapeHtml(sourceSite)}!</b>\n\n` +
            `🌐 <b>Site:</b> <code>${escapeHtml(sourceSite)}</code>\n` +
            `📍 <b>Location:</b> ${escapeHtml(clientCountry)} (<code>${escapeHtml(clientIp)}</code>)\n` +
            `🎉 <b>Total Waves:</b> ${count}\n` +
            `⏰ <b>Time (IST):</b> ${escapeHtml(istTime)}`
          )
        );

        return new Response(JSON.stringify({ success: true, waves_count: count }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 4. POST /api/visit - Rich Visitor Telemetry & Tracker
      if (path === '/api/visit' && request.method === 'POST') {
        let body = {};
        try {
          body = await request.json();
        } catch {}

        // Cloudflare server-side properties
        const cf = request.cf || {};
        const clientIp = request.headers.get('CF-Connecting-IP') || 'Unknown';
        const clientCountry = cf.country || request.headers.get('CF-IPCountry') || 'Unknown';
        const clientCity = cf.city || 'Unknown';
        const clientRegion = cf.region || '';
        const clientPostal = cf.postalCode || '';
        const clientLat = cf.latitude ? String(cf.latitude) : '';
        const clientLon = cf.longitude ? String(cf.longitude) : '';
        const clientTz = cf.timezone || '';
        const clientIsp = cf.asOrganization || '';
        const clientAsn = cf.asn ? `AS${cf.asn}` : '';
        const tlsVer = cf.tlsVersion || '';
        const tlsCipher = cf.tlsCipher || '';
        const userAgent = request.headers.get('User-Agent') || 'Unknown';

        // Client-side payload
        const sourceSite = normalizeSite(body.site, body.origin, request.headers.get('Origin'));
        const visitorId = body.visitorId || ('anon_' + clientIp.replace(/[^a-zA-Z0-9]/g, ''));
        const pathVisited = body.path || '/';
        const referrer = body.referrer || request.headers.get('Referer') || '';
        const screen = body.screen || {};
        const screenRes = screen.width ? `${screen.width}x${screen.height}@${screen.pixelRatio || 1}x` : '';
        const device = body.device || {};
        const canvasHash = body.canvasHash || '';
        const tlsFp = buildTlsFingerprint(cf);
        const compositeId = `${visitorId}_${canvasHash}_${tlsFp}`;
        const localIdentity = body.localIdentity ? JSON.stringify(body.localIdentity) : null;
        const utm = body.utm || {};
        const visitCount = body.visitCount || 1;
        const istTime = getISTDateString();

        // 1) Record into Cloudflare D1 immediately (if configured)
        if (env.DB) {
          ctx.waitUntil((async () => {
            try {
              await env.DB.prepare(`
                INSERT INTO visits (
                  visitor_id, composite_id, site, path, ip, country, city, region,
                  postal_code, latitude, longitude, timezone, isp, asn, user_agent,
                  device_cores, device_memory, screen_res, touch_points, connection_type,
                  is_dark_mode, language, referrer, utm_source, utm_medium, utm_campaign,
                  canvas_hash, tls_version, tls_cipher, tls_fp, local_identity, visit_count
                ) VALUES (
                  ?, ?, ?, ?, ?, ?, ?, ?,
                  ?, ?, ?, ?, ?, ?, ?,
                  ?, ?, ?, ?, ?,
                  ?, ?, ?, ?, ?, ?,
                  ?, ?, ?, ?, ?, ?
                )
              `).bind(
                visitorId, compositeId, sourceSite, pathVisited, clientIp, clientCountry, clientCity, clientRegion,
                clientPostal, clientLat, clientLon, clientTz, clientIsp, clientAsn, userAgent.substring(0, 300),
                device.cores || null, device.memory || null, screenRes, device.touchPoints || 0, device.connection || null,
                device.isDarkMode ? 1 : 0, device.language || null, referrer.substring(0, 300), utm.utm_source || null, utm.utm_medium || null, utm.utm_campaign || null,
                canvasHash, tlsVer, tlsCipher, tlsFp, localIdentity, visitCount
              ).run();
            } catch (d1Err) {
              console.error('D1 insert failed:', d1Err);
            }
          })());
        }

        // 2) Notification Throttling: 60s cooldown per visitor per site to avoid spamming Telegram
        const throttleKey = `visit_notif_${sourceSite}_${visitorId}`;
        let shouldNotify = true;

        if (env.STATUS_KV) {
          const isThrottled = await env.STATUS_KV.get(throttleKey);
          if (isThrottled) {
            shouldNotify = false;
          } else {
            await env.STATUS_KV.put(throttleKey, '1', { expirationTtl: 60 });
          }
        }

        // 3) Send Telegram Alert if not throttled
        if (shouldNotify) {
          let identityNote = '';
          if (body.localIdentity) {
            identityNote = `\n👤 <b>LocalStorage Identity:</b> <code>${escapeHtml(JSON.stringify(body.localIdentity))}</code>`;
          }

          let utmNote = '';
          if (utm.utm_source) {
            utmNote = `\n🎯 <b>Campaign:</b> ${escapeHtml(utm.utm_source)} / ${escapeHtml(utm.utm_medium || 'none')}`;
          }

          const visitType = visitCount > 1 ? `Returning visitor (Visit #${visitCount})` : 'New visitor';

          const msg = 
            `👀 <b>Visitor on ${escapeHtml(sourceSite)}!</b>\n\n` +
            `🌐 <b>Site & Path:</b> <code>${escapeHtml(sourceSite)}${escapeHtml(pathVisited)}</code>\n` +
            `📍 <b>Location:</b> ${escapeHtml(clientCity)}, ${escapeHtml(clientCountry)} (<code>${escapeHtml(clientIp)}</code>)\n` +
            `🏢 <b>ISP / ASN:</b> ${escapeHtml(clientIsp || 'Unknown')} (${escapeHtml(clientAsn)})\n` +
            `🏷️ <b>Status:</b> ${escapeHtml(visitType)}\n` +
            `💻 <b>Device / Screen:</b> ${escapeHtml(screenRes || 'Standard')}${device.cores ? ` | ${device.cores} cores` : ''}${device.memory ? ` | ${device.memory}GB RAM` : ''}\n` +
            `🔗 <b>Referrer:</b> ${escapeHtml(referrer || 'Direct')}` +
            utmNote +
            identityNote +
            `\n⏰ <b>Time (IST):</b> ${escapeHtml(istTime)}`;

          ctx.waitUntil(sendTelegramNotification(env, msg));
        }

        return new Response(JSON.stringify({
          success: true,
          notified: shouldNotify,
          site: sourceSite,
          visitorId,
          visitCount,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 5. POST /api/report/trigger - Manual trigger for the daily report (useful for testing)
      if (path === '/api/report/trigger' && request.method === 'POST') {
        const authHeader = request.headers.get('Authorization') || '';
        const token = authHeader.replace(/^Bearer\s+/i, '');

        if (env.AUTH_SECRET && token !== env.AUTH_SECRET) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        ctx.waitUntil(generateAndSendDailyReport(env));
        return new Response(JSON.stringify({ success: true, message: 'Daily report generation triggered.' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
