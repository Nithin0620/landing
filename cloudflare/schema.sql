-- Migration schema for visits table
CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL,
  composite_id TEXT,
  site TEXT NOT NULL,
  path TEXT,
  ip TEXT NOT NULL,
  country TEXT,
  city TEXT,
  region TEXT,
  postal_code TEXT,
  latitude TEXT,
  longitude TEXT,
  timezone TEXT,
  isp TEXT,
  asn TEXT,
  user_agent TEXT,
  device_cores INTEGER,
  device_memory REAL,
  screen_res TEXT,
  touch_points INTEGER,
  connection_type TEXT,
  is_dark_mode INTEGER,
  language TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  canvas_hash TEXT,
  tls_version TEXT,
  tls_cipher TEXT,
  tls_fp TEXT,
  local_identity TEXT,
  visit_count INTEGER DEFAULT 1,
  visited_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_visits_visited_at ON visits(visited_at);
CREATE INDEX IF NOT EXISTS idx_visits_visitor_id ON visits(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visits_composite_id ON visits(composite_id);
CREATE INDEX IF NOT EXISTS idx_visits_site ON visits(site);
CREATE INDEX IF NOT EXISTS idx_visits_ip ON visits(ip);
