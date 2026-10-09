/**
 * Cloudflare Worker for Live Developer Command Center & Hermes Status
 * 
 * Environment Bindings:
 * - STATUS_KV: KV Namespace binding for storing status, history, and wave counts
 * - AUTH_SECRET: Secret Bearer token for laptop daemon PUT requests
 * - TELEGRAM_BOT_TOKEN: Telegram bot API token (optional)
 * - TELEGRAM_CHAT_ID: Telegram chat ID to receive notifications (optional)
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Default fallback data when KV is empty
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

async function sendTelegramNotification(env, message) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return;
  }
  try {
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch (err) {
    console.error('Failed to send Telegram notification:', err);
  }
}

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
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
          if (raw) {
            statusData = raw;
          }
          const waves = await env.STATUS_KV.get('waves_count');
          statusData.waves_count = waves ? parseInt(waves, 10) : 0;
        }

        // Check if status is stale (> 15 mins)
        const lastUpdated = new Date(statusData.updated_at).getTime();
        const now = Date.now();
        if (now - lastUpdated > 15 * 60 * 1000) {
          statusData.state = 'offline';
        }

        return new Response(JSON.stringify(statusData), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=30', // Edge-cache for 30s
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

        const clientIp = request.headers.get('CF-Connecting-IP') || 'Unknown IP';
        const clientCountry = request.headers.get('CF-IPCountry') || 'Unknown';
        
        ctx.waitUntil(
          sendTelegramNotification(
            env,
            `👋 <b>New Wave on Landing Page!</b>\n\n` +
            `📍 <b>Location:</b> ${clientCountry} (${clientIp})\n` +
            `🎉 <b>Total Waves:</b> ${count}\n` +
            `⏰ <b>Time:</b> ${new Date().toLocaleTimeString()}`
          )
        );

        return new Response(JSON.stringify({ success: true, waves_count: count }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // 4. POST /api/visit - Page visit tracker with throttle
      if (path === '/api/visit' && request.method === 'POST') {
        const clientIp = request.headers.get('CF-Connecting-IP') || 'Unknown';
        const clientCountry = request.headers.get('CF-IPCountry') || 'Unknown';
        const userAgent = request.headers.get('User-Agent') || 'Unknown';

        // Throttle visit alerts: max 1 notification every 10 minutes per IP
        const throttleKey = `visit_throttle_${clientIp}`;
        let shouldNotify = true;

        if (env.STATUS_KV) {
          const isThrottled = await env.STATUS_KV.get(throttleKey);
          if (isThrottled) {
            shouldNotify = false;
          } else {
            // Set 10-minute expiration for throttle
            await env.STATUS_KV.put(throttleKey, '1', { expirationTtl: 600 });
          }
        }

        if (shouldNotify) {
          ctx.waitUntil(
            sendTelegramNotification(
              env,
              `👀 <b>New Visitor on Landing Page!</b>\n\n` +
              `📍 <b>Location:</b> ${clientCountry}\n` +
              `🌐 <b>IP:</b> ${clientIp}\n` +
              `💻 <b>Browser:</b> ${userAgent.substring(0, 100)}\n` +
              `⏰ <b>Time:</b> ${new Date().toLocaleTimeString()}`
            )
          );
        }

        return new Response(JSON.stringify({ success: true, notified: shouldNotify, country: clientCountry }), {
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
