# Deploy in ~10 minutes (Render + Vercel)

Fastest path for this project: Render (API) + Vercel (client).

---

## 1. Backend on Render (~5 min)

1. Push this repo to **GitHub**.
2. Go to [render.com](https://render.com) → **New** → **Blueprint**.
3. Connect the repo — Render reads [`render.yaml`](../render.yaml) at the repo root.
4. Approve the blueprint (creates API + disk + env vars automatically).
5. Wait for deploy → copy the API URL (e.g. `https://salary-management-api.onrender.com`).
6. Open **Shell** on the Render service (dashboard → your service → **Shell**):

   ```bash
   npm run seed
   ```

7. Test: `https://<your-api>/health` → `{"status":"ok"}`

| Setting | Value (from blueprint) |
|---------|-------------------------|
| Root | `apps/server` |
| Disk | `/var/data` |
| `DATABASE_URL` | `file:/var/data/prod.db` |
| Start | `npm run start:prod` (migrations + server) |

---

## 2. Frontend on Vercel (~3 min)

1. [vercel.com](https://vercel.com) → **Add New** → **Project** → import the same repo.
2. **Root Directory:** `apps/client`
3. **Environment variable:**

   | Key | Value |
   |-----|--------|
   | `VITE_API_BASE_URL` | `https://<your-render-api-url>` |

   No trailing slash. **Do not** add `/api` — that prefix is only for local Vite proxy.

4. **Deploy** → copy the Vercel URL.

---

## 3. Connect CORS (~1 min)

In **Render** → your API service → **Environment**:

```text
CORS_ORIGIN=https://<your-vercel-url>
```

Save (auto-redeploy).

---

## 4. Login

- URL: your Vercel app  
- Email: `admin@company.com`  
- Password: `Admin@123` (or whatever you set in Render for `SEED_ADMIN_PASSWORD`)

---

## If Render free tier sleeps

First request after idle may take ~30s. Upgrade or use a cron ping if needed for demos.
