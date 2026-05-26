# Deployment Guide

Deploy **client → Vercel** and **API → Render** (or Railway with equivalent env vars).

## Prerequisites

- GitHub repo pushed to remote
- Vercel account
- Render account

---

## 1. Backend (Render)

### Option A — Blueprint

1. In Render Dashboard → **New** → **Blueprint**.
2. Connect this repo; Render reads [`render.yaml`](../render.yaml).
3. Set **`CORS_ORIGIN`** to your Vercel URL after frontend deploy (e.g. `https://salary-management.vercel.app`).

### Option B — Manual Web Service

| Setting | Value |
|---------|--------|
| Root Directory | `apps/server` |
| Build Command | `npm install && npm run prisma:generate && npm run build` |
| Start Command | `npm run start:prod` |
| Health Check | `/health` |

**Environment variables**

| Key | Example |
|-----|---------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `file:/var/data/prod.db` |
| `JWT_SECRET` | _(long random string)_ |
| `JWT_EXPIRES_IN` | `8h` |
| `CORS_ORIGIN` | `https://your-frontend.vercel.app` |
| `SEED_ADMIN_EMAIL` | `admin@company.com` |
| `SEED_ADMIN_PASSWORD` | _(strong password)_ |

**Persistent disk (required for SQLite)**

- Mount path: `/var/data`
- Size: 1 GB
- `DATABASE_URL` must use `file:/var/data/prod.db`

### Post-deploy

```bash
# One-time: seed employees (Render shell or local against prod — prefer shell)
cd apps/server && npm run seed
```

Or add a one-off job; seed is idempotent (skips if ≥10k rows).

Note your API URL: `https://<service>.onrender.com`

---

## 2. Frontend (Vercel)

1. **Import** Git repo in Vercel.
2. Set **Root Directory** to `apps/client`.
3. Framework: **Vite** (or use [`vercel.json`](../apps/client/vercel.json)).
4. **Environment variable:**

| Key | Value |
|-----|--------|
| `VITE_API_BASE_URL` | `https://<your-render-service>.onrender.com` |

5. Deploy.

`vercel.json` includes SPA rewrites so client-side routes work.

---

## 3. Verify

1. Open Vercel URL → login page loads.
2. Login with admin credentials.
3. Employees list loads (seed data).
4. Analytics charts render.
5. Create / edit / delete one employee.

---

## Railway

**Full step-by-step guide:** [DEPLOYMENT-RAILWAY.md](DEPLOYMENT-RAILWAY.md)

Quick summary: Root Directory `apps/server`, volume at `/data`, `DATABASE_URL=file:/data/prod.db`, `npm run start:prod`, then seed via `railway run npm run seed`.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS errors | Set `CORS_ORIGIN` on server to exact Vercel origin (no trailing slash) |
| 401 on all routes | Login again; check `JWT_SECRET` stable across deploys |
| Empty employees | Run `npm run seed` on server |
| DB resets on deploy | Attach persistent disk; fix `DATABASE_URL` path |
