# Deploy on Railway

This guide deploys the **API** (`apps/server`) on [Railway](https://railway.com). The **React client** can stay on Vercel (recommended) or also be deployed on Railway.

---

## Prerequisites

1. [Railway account](https://railway.com) (GitHub login)
2. Repo pushed to **GitHub**
3. (Optional) [Vercel account](https://vercel.com) for the frontend

---

## Part 1 — Backend API on Railway

### Step 1: New project

1. Open [railway.com/dashboard](https://railway.com/dashboard)
2. **New Project** → **Deploy from GitHub repo**
3. Select `incubyte-salary-management` (your repo)
4. Railway may create a service from the repo root — we need to fix the root directory next.

### Step 2: Set root directory to `apps/server`

1. Click the **service** → **Settings**
2. **Root Directory** → `apps/server`
3. **Save**

Railway will use [`apps/server/railway.toml`](../apps/server/railway.toml) for build/start commands.

### Step 3: Add a volume (SQLite must persist)

Without a volume, the database file is wiped on every redeploy.

1. Service → **Settings** → **Volumes**
2. **Add Volume**
3. **Mount path:** `/data`
4. Save

### Step 4: Environment variables

Service → **Variables** → add:

| Variable | Value |
|----------|--------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `file:/data/prod.db` |
| `JWT_SECRET` | _(generate a long random string, 32+ chars)_ |
| `JWT_EXPIRES_IN` | `8h` |
| `SEED_ADMIN_EMAIL` | `admin@company.com` |
| `SEED_ADMIN_PASSWORD` | _(your secure password)_ |
| `SEED_ADMIN_NAME` | `System Admin` |
| `CORS_ORIGIN` | _(set after frontend deploy — e.g. `https://your-app.vercel.app`)_ |

`PORT` is set automatically by Railway — do not override unless you know why.

### Step 5: Deploy

1. **Commit** an up-to-date `apps/server/package-lock.json` (Railway runs `npm ci`, which fails if the lockfile is out of sync with `package.json`).
2. **Deployments** tab → trigger deploy (or push to GitHub)
3. Wait for build: `npm ci` → `prisma generate` → `tsc` → `prisma migrate deploy` → server start
3. **Settings** → **Networking** → **Generate Domain** (e.g. `https://salary-management-api-production.up.railway.app`)

### Step 6: Health check

Open in browser:

```text
https://<your-railway-domain>/health
```

Expected: `{"status":"ok"}`

### Step 7: Seed 10,000 employees (one time)

**Option A — Railway CLI (recommended)**

```bash
# Install CLI: https://docs.railway.com/guides/cli
npm i -g @railway/cli
railway login
cd apps/server
railway link          # select your project + service
railway run npm run seed
```

**Option B — One-off command in dashboard**

Some Railway plans support running a shell command from the service view. From `apps/server`:

```bash
npm run seed
```

Seed is idempotent: if ≥10,000 employees exist, it skips insertion.

---

## Part 2 — Frontend (Vercel + Railway API)

### Step 1: Deploy client on Vercel

1. [vercel.com](https://vercel.com) → **Add New Project** → import Git repo
2. **Root Directory:** `apps/client`
3. **Environment variable:**

| Key | Value |
|-----|--------|
| `VITE_API_BASE_URL` | `https://<your-railway-domain>` |

No trailing slash on the Railway URL.

4. Deploy

### Step 2: Enable CORS on Railway

Back in Railway **Variables**, set:

```text
CORS_ORIGIN=https://<your-vercel-domain>
```

Example: `https://salary-management.vercel.app`

Redeploy the API service (or it may auto-redeploy on variable change).

### Step 3: Test end-to-end

1. Open Vercel URL → **Sign in**
2. Login: `admin@company.com` / your `SEED_ADMIN_PASSWORD`
3. **Employees** list loads
4. **Analytics** charts work

---

## Part 3 — Frontend on Railway (optional)

You can host the static Vite build on Railway instead of Vercel:

1. **New service** in same project → GitHub repo
2. **Root Directory:** `apps/client`
3. **Build command:** `npm install && npm run build`
4. **Start command:** `npx serve dist -s -l $PORT`  
   Add dev dependency or use `npx serve` (Railway may need `npm install -g serve` in build)
5. Variable: `VITE_API_BASE_URL=https://<api-railway-domain>` (set at **build** time for Vite)
6. Set API `CORS_ORIGIN` to this frontend Railway URL

For interviews, **Vercel (client) + Railway (API)** is the simplest split.

---

## Quick reference

| Item | Value |
|------|--------|
| API root | `apps/server` |
| Build | `npm install && npm run prisma:generate && npm run build` |
| Start | `npm run start:prod` |
| DB path (with volume) | `file:/data/prod.db` |
| Health | `/health` |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm ci` / lockfile out of sync | From `apps/server` run `npm install`, commit `package-lock.json`, redeploy |
| Build fails on `better-sqlite3` | Ensure Nixpacks/Node 20+; redeploy; check build logs |
| `P2021` / table not found | `start:prod` runs migrations; check deploy logs for Prisma errors |
| CORS error in browser | `CORS_ORIGIN` must exactly match frontend URL (scheme + host, no path) |
| Login works, employees empty | Run `railway run npm run seed` from `apps/server` |
| Data lost after redeploy | Volume not mounted or wrong `DATABASE_URL` path |
| 502 / app not listening | App must listen on `process.env.PORT` (already uses `env.PORT`) |

---

## Update README

After deploy, add your live URLs to [README.md](../README.md):

```markdown
| Frontend | https://your-app.vercel.app |
| API      | https://your-api.up.railway.app |
```

Record a demo using [DEMO.md](DEMO.md).
