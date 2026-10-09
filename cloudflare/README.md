# Cloudflare Worker Live Status & Telemetry Backend

This directory contains the Cloudflare Worker and configuration powering the live developer status, hardware telemetry KV storage, and Telegram visitor notifications.

---

### Deployment & CI/CD Notes

> **Note**: Pushing to GitHub will trigger your frontend host (Cloudflare Pages / Vercel / Netlify) to rebuild and update the landing page UI. It does **not** redeploy this Cloudflare Worker automatically.

---

### When do you ever need to redeploy the worker?

Only if you modify the backend logic in [`worker.js`](./worker.js) or change bindings in [`wrangler.toml`](./wrangler.toml) in the future. In that case, you just run:

```bash
cd cloudflare
npx wrangler deploy
```

For everyday frontend changes or normal development, just do your regular `git push`!

---

### Live Endpoints

* **Base URL**: `https://landing-live-status.nithin30302.workers.dev`
* `GET /api/status`: Publicly cached edge endpoint returning live Hermes task, CPU sparklines, RAM, and battery state.
* `PUT /api/status`: Authenticated telemetry endpoint used by the local laptop daemon.
* `POST /api/wave`: Public rate-limited endpoint triggering celebratory wave alerts on Telegram.
* `POST /api/visit`: Throttled beacon endpoint informing you via Telegram when someone visits your landing page.
