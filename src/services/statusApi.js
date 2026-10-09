/**
 * API Service for Live Status, Visitor Waves, and Visit Tracking
 */

// Fallback default status if API endpoint is unavailable
const FALLBACK_STATUS = {
  task: 'Building high-performance web systems & autonomous agent workflows',
  category: 'Full Stack / AI',
  state: 'active',
  updated_at: new Date().toISOString(),
  hardware: {
    cpu_percent: 16.4,
    cpu_history: [12, 18, 14, 22, 19, 15, 20, 16, 14, 16],
    ram_used_gb: 7.2,
    ram_total_gb: 16.0,
    battery: 94,
    is_charging: true,
    uptime: '1d 14h',
  },
  agent: {
    name: 'Hermes',
    model: 'Hermes 3 / Local',
    tasks_today: 6,
  },
  context: {
    project: 'landing',
    branch: 'master',
    music: 'Focus Beats',
  },
  waves_count: 12,
};

const rawBaseUrl = (import.meta.env.VITE_STATUS_API_URL || '').trim();
const API_BASE_URL = rawBaseUrl && !/^https?:\/\//i.test(rawBaseUrl)
  ? `https://${rawBaseUrl}`
  : rawBaseUrl;

export async function fetchLiveStatus() {
  if (!API_BASE_URL) {
    return FALLBACK_STATUS;
  }
  try {
    const res = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/status`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Using fallback status data:', err.message);
    return FALLBACK_STATUS;
  }
}

export async function sendWave() {
  if (!API_BASE_URL) {
    return { success: true, waves_count: FALLBACK_STATUS.waves_count + 1 };
  }
  try {
    const res = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/wave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (err) {
    console.warn('Failed to send wave to API:', err.message);
    return { success: true, waves_count: 1 };
  }
}

export async function trackVisit() {
  if (!API_BASE_URL) return { success: true, notified: false };
  try {
    const res = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Non-blocking beacon
  }
  return { success: false, notified: false };
}
