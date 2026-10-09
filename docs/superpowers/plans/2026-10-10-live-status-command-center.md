# Live Status & Developer Command Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a zero-LLM-cost live status and developer command center featuring CPU/RAM sparklines, Hermes agent state, workspace context, and an interactive visitor wave button with Telegram alerts.

**Architecture:** Python telemetry daemon on laptop pushes periodic updates (0 LLM cost) to a Cloudflare Worker KV store. React frontend polls the Cloudflare Worker to render a Navbar Live Status Pill and a Hero Command Center card with live SVG sparklines, and triggers Telegram alerts on page visits and waves.

**Tech Stack:** React, Tailwind CSS, Cloudflare Workers & KV, Python (psutil), Telegram Bot API.

**Spec:** `docs/superpowers/specs/2026-10-10-live-status-command-center-design.md`

## Global Constraints
- Zero LLM API calls for status polling or telemetry updates.
- Graceful offline fallback: if status is older than 15 minutes, state displays as `offline`.
- Safe defaults: if Cloudflare KV is unreachable or empty, frontend displays fallback mock telemetry gracefully without crashing.
- Anti-spam throttling for Telegram notifications on visitor page views.

---

### Task 1: Cloudflare Worker API & KV Backend (`cloudflare/worker.js`)

**Files:**
- Create: `cloudflare/worker.js`
- Create: `cloudflare/wrangler.toml`

**Interfaces:**
- Produces:
  - `GET /api/status` -> Returns JSON `{ task, category, state, updated_at, hardware, agent, context }`
  - `PUT /api/status` -> Requires `Authorization: Bearer <SECRET_TOKEN>`, updates KV
  - `POST /api/wave` -> Increments wave count, sends Telegram alert
  - `POST /api/visit` -> Records visit, sends throttled Telegram alert

- [ ] **Step 1: Write Cloudflare Worker implementation**
Write `cloudflare/worker.js` with CORS support, KV bindings (`STATUS_KV`), and Telegram API webhook helper (`sendTelegramNotification`).

- [ ] **Step 2: Write Wrangler configuration**
Write `cloudflare/wrangler.toml` specifying worker name, main script, and KV namespace binding.

- [ ] **Step 3: Verification**
Verify JavaScript syntax with Node or linting.

---

### Task 2: Local Laptop Status Bridge Daemon (`scripts/hermes_status_daemon.py`)

**Files:**
- Create: `scripts/hermes_status_daemon.py`
- Create: `scripts/requirements.txt`
- Create: `scripts/.env.example`

**Interfaces:**
- Consumes: System telemetry (`psutil`), Git state (`git rev-parse`), Media state (`playerctl`)
- Produces: HTTP PUT request with Bearer Auth to Cloudflare Worker endpoint

- [ ] **Step 1: Write requirements and configuration template**
Create `scripts/requirements.txt` (including `psutil`, `requests`) and `scripts/.env.example`.

- [ ] **Step 2: Implement Python Telemetry & Hermes State Reader**
Implement `scripts/hermes_status_daemon.py` with:
- CPU history buffer (keeps last 10 readings for sparklines)
- RAM and Battery percentage calculations
- Active Git repo/branch detection
- `playerctl` media detection
- Periodic push loop with configurable interval (default: 30s)

- [ ] **Step 3: Test daemon locally**
Run `python3 scripts/hermes_status_daemon.py --dry-run` to verify payload structure.

---

### Task 3: Navbar Live Status Pill Component (`src/components/LiveStatusPill.jsx`)

**Files:**
- Create: `src/components/LiveStatusPill.jsx`
- Modify: `src/components/Layout.jsx`

**Interfaces:**
- Consumes: Status API endpoint (`/api/status`) or fallback data
- Produces: Pulsing status pill (🟢 Active / 🟡 Away / 💤 Offline)

- [ ] **Step 1: Build `LiveStatusPill.jsx`**
Create component with live polling (every 60s), animated ping indicator, task tooltip, and status state handling.

- [ ] **Step 2: Integrate into `Layout.jsx` Navbar**
Add `LiveStatusPill` into the header bar adjacent to the navigation links.

- [ ] **Step 3: Test in browser/build**
Run `npm run build` to verify JSX compilation.

---

### Task 4: Hero Live Command Center Card (`src/components/LiveCommandCenter.jsx`)

**Files:**
- Create: `src/components/LiveCommandCenter.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: Live status payload from Cloudflare Worker
- Produces:
  - SVG sparkline graph of CPU history
  - Hardware gauges (RAM, Battery, Uptime)
  - Hermes Agent status & Workspace context badges
  - Interactive "Send Wave 👋" button with Telegram webhook trigger and animated celebration state

- [ ] **Step 1: Build `LiveCommandCenter.jsx`**
Implement glassmorphism card, SVG sparkline renderer, hardware stats grid, active project badge, and interactive wave trigger with confetti / celebration animation.

- [ ] **Step 2: Integrate into `Home.jsx`**
Embed the `LiveCommandCenter` component in the Hero section of the Home page.

- [ ] **Step 3: Test visitor visit beacon**
Add `useEffect` beacon to send visit notification to `/api/visit`.

- [ ] **Step 4: Verify build**
Run `npm run build` to ensure all React components compile without errors.
