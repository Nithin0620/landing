// Client-side visitor intelligence helper for landing and portfolio

// Simple fast djb2 string hashing
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

// Generate canvas + WebGL fingerprint
function getCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'no-canvas-2d';

    ctx.textBaseline = 'top';
    ctx.font = '14px "Arial", sans-serif';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('ssh.net.in visit', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('ssh.net.in visit', 4, 17);

    // Also get WebGL renderer if available
    let glRenderer = '';
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          glRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
        }
      }
    } catch {}

    const dataUrl = canvas.toDataURL();
    return hashString(dataUrl + '|' + glRenderer);
  } catch {
    return 'fp-err';
  }
}

// Persistent Visitor ID management via localStorage & cookie fallback
function getOrCreateVisitorId() {
  const STORAGE_KEY = '_ssh_visitor_id';
  const COOKIE_KEY = '_ssh_vid';

  let vid = '';
  try {
    vid = localStorage.getItem(STORAGE_KEY) || '';
  } catch {}

  if (!vid && typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_KEY + '=([^;]*)'));
    if (match) vid = decodeURIComponent(match[1]);
  }

  if (!vid) {
    // Generate UUIDv4-like random ID
    vid = 'v_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  }

  // Persist
  try {
    localStorage.setItem(STORAGE_KEY, vid);
  } catch {}

  if (typeof document !== 'undefined') {
    // Cookie valid for 2 years
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(vid)}; path=/; max-age=63072000; SameSite=Lax`;
  }

  return vid;
}

// Track visit counts in localStorage
function updateLocalVisitCount() {
  const COUNT_KEY = '_ssh_visit_count';
  const LAST_SEEN_KEY = '_ssh_last_seen';
  let count = 1;
  let lastSeen = null;

  try {
    const saved = localStorage.getItem(COUNT_KEY);
    lastSeen = localStorage.getItem(LAST_SEEN_KEY);
    if (saved) {
      count = parseInt(saved, 10) + 1;
    }
    localStorage.setItem(COUNT_KEY, count.toString());
    localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
  } catch {}

  return { count, lastSeen };
}

// Extract any known local storage identity (names, emails, logins)
function getKnownLocalStorageIdentity() {
  const identity = {};
  if (typeof localStorage === 'undefined') return identity;

  const candidateKeys = [
    'user', 'username', 'name', 'email', 'profile', 'auth', 'login', 'account',
    'portfolio_visitor_name', 'visitor_name', 'nick', 'user_id', 'client_id'
  ];

  for (const key of candidateKeys) {
    try {
      const val = localStorage.getItem(key);
      if (val) {
        // Truncate length for safety
        identity[key] = val.length > 200 ? val.substring(0, 200) + '...' : val;
      }
    } catch {}
  }
  return identity;
}

// Gather all browser and hardware telemetry
export function collectVisitorPayload() {
  if (typeof window === 'undefined') return {};

  const { count, lastSeen } = updateLocalVisitCount();
  const visitorId = getOrCreateVisitorId();
  const canvasHash = getCanvasFingerprint();
  const identity = getKnownLocalStorageIdentity();

  // Parse URL search params (UTM, ref, etc.)
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(k => {
    if (params.get(k)) utm[k] = params.get(k);
  });

  return {
    visitorId,
    visitCount: count,
    lastSeen,
    canvasHash,
    site: window.location.hostname || 'ssh.net.in',
    origin: window.location.origin,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer || '',
    utm,
    screen: {
      width: window.screen?.width,
      height: window.screen?.height,
      colorDepth: window.screen?.colorDepth,
      pixelRatio: window.devicePixelRatio || 1,
    },
    device: {
      cores: navigator.hardwareConcurrency || null,
      memory: navigator.deviceMemory || null, // GB
      touchPoints: navigator.maxTouchPoints || 0,
      connection: navigator.connection ? navigator.connection.effectiveType : null,
      language: navigator.language || (navigator.languages && navigator.languages[0]) || '',
      languages: navigator.languages ? navigator.languages.join(',') : '',
      platform: navigator.platform || '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      isDarkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
    },
    localIdentity: Object.keys(identity).length > 0 ? identity : null,
  };
}
