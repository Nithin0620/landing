# Plan: `ssh.net.in` Personal Root Hub & Landing Portal

## 1. Concept & Vision
Transform the existing dark-space liquid-glass design system into a **high-tech developer root hub and landing portal** for `ssh.net.in` ("Nithin's Internet").

Since `ssh.net.in` will serve as the root domain hosting your subdomains, services, experiments, and infrastructure monitoring, this landing page serves as the **central command console / mission control** for anyone accessing the root domain.

---

## 2. Section-by-Section Architecture

### **Header & Terminal Quick-Connect**
- **Brand / Hostname:** `ssh.net.in` (with interactive CLI prompt indicator: `guest@ssh.net.in:~$`)
- **Nav Links:** `#services`, `#projects`, `#infrastructure`, `#links`
- **Liquid Glass Quick-Status:** Live indicator pill: `🟢 All Systems Operational`

---

### **Section 1: Hero ("Nithin's Internet")**
- **Background:** Cosmic space background video with liquid glass overlay and noise texture.
- **Headline:** `NITHIN'S INTERNET` (Bold Anton font)
- **Accent Script:** `ssh.net.in` in neon green cursive Condiment overlay.
- **Sub-tagline:** `Projects · Infrastructure · Experiments` (in crisp Monospace with neon accents).
- **Interactive Quick-Actions:**
  - Copy SSH command button: `ssh guest@ssh.net.in` (with one-click copy feedback)
  - Quick Jump to Subdomains button
- **Live Tech Metatags:** Floating liquid glass badges: `Edge Routed`, `Global CDN`, `Encrypted`.

---

### **Section 2: 🟢 Active Services & Subdomains**
Direct portal to all your primary hosted subdomains in glassmorphic cards:
1. **Nithin Personal** (`me.ssh.net.in` / `nithin.ssh.net.in`)
   - Portfolio, bio, resume, articles.
2. **Infra & Monitoring** (`status.ssh.net.in` / `infra.ssh.net.in`)
   - Server metrics, uptime monitoring, Grafana/Uptime Kuma dashboard.
3. **WTC Project** (`wtc.ssh.net.in`)
   - Dedicated application / flagship project portal.
4. **Lab / Experiments** (`lab.ssh.net.in` / `play.ssh.net.in`)
   - Interactive demos, micro-tools, AI experiments.

*Each card features live status dot (`🟢 Online`), subdomain URL, quick description, external jump button (`↗`) with glowing purple/neon hover effects.*

---

### **Section 3: 🚀 Projects & Deployments**
Showcase of your featured GitHub repositories, apps, and open-source tools:
- **Card layout:** Liquid-glass cards with interactive tags (`React`, `Go`, `Node.js`, `Docker`, `Rust`, `Python`).
- **Details:** Project name, live link, GitHub repository link, star counter badge, and architecture notes.
- **Filter tabs:** `All`, `Web Apps`, `CLI & Tools`, `Infra / DevOps`.

---

### **Section 4: 🖥 Infrastructure & Node Status**
A real-time styled server dashboard giving a server control room feel:
- **Status Grid:**
  - **VPS Primary Node (Oracle / Hetzner / AWS):** `🟢 Online` (Uptime: 99.98%, Latency: ~18ms)
  - **Cloudflare Edge Routing:** `🟢 Active` (DDoS Protection, SSL Edge)
  - **Core APIs & Microservices:** `🟢 Healthy`
  - **Self-Hosted Database / Storage:** `🟢 Synchronized`
- **Live Terminal / Syslog ticker:** Simulated interactive live ping or syslog stream for that elite sysadmin aesthetic.

---

### **Section 5: 🔗 Links & Footer Network**
- **Social / Dev Network:** GitHub, LinkedIn, Twitter/X, Email, Discord, Mastodon/Telegram.
- **PGP / SSH Public Key Fingerprint:** Compact expandable liquid-glass snippet.
- **Copyright & System Specs:** `ssh.net.in © 2026 · Hosted on Linux · Edge-Accelerated`.

---

## 3. Technology Stack & Design System Preserved
- **Framework:** React + Tailwind CSS + Lucide Icons + Vite.
- **Theme:** Dark Space (`#010828`), Off-white text (`#EFF4FF`), Neon Green accents (`#6FFF00`), Royal Purple gradients (`#b724ff` → `#7c3aed`).
- **Typography:** `Anton` (Headings), `Condiment` (Signatures/Accents), `ui-monospace` (System & Command lines).
- **Effects:** `.liquid-glass` frosted blur with dual-masked gradient borders.

---

## 4. Next Steps
Once you approve this plan, I will:
1. Update [`src/App.jsx`](file:///home/nithin/Projects/landing/src/App.jsx) with all 5 sections, interactive copy-to-clipboard terminal helper, live status badges, subdomain cards, project showcase, and infrastructure status widgets.
2. Ensure full mobile/tablet/desktop responsiveness.
3. Test production build to guarantee fast load times and clean animations.
