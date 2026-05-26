# Tradeoffs

## SQLite vs PostgreSQL / MySQL

**Chosen: SQLite**

| Pros | Cons |
|------|------|
| No external DB service for local review | Not ideal for high concurrent writes |
| Fast enough for 10k employees + analytics reads | Production deploy needs persistent disk (Render) |
| Simple backup (copy file) | No built-in replication |

**When to migrate:** Multiple concurrent HR admins writing heavily, or multi-region deployment — move to PostgreSQL with the same Prisma schema.

## Batching strategy (seed)

**Chosen: `createMany` in transactions, batch size 1,000**

- Deletes existing employees in one transaction (when full re-seed).
- Inserts in batches to avoid SQLite variable limits and memory spikes.
- Skips insert if DB already has ≥ target count (safe for repeated `npm run seed`).

**Tradeoff:** Full re-seed clears all employees first — acceptable for demo/dev, not for production with live edits unless `clearExisting: false` is used.

## JWT auth vs sessions

**Chosen: Stateless JWT**

| Pros | Cons |
|------|------|
| Simple API-only backend | Cannot revoke token before expiry without a blocklist |
| Works across Vercel + Render origins | Token in `localStorage` (XSS risk — mitigate with CSP in prod) |

Sessions with HTTP-only cookies would be more secure for a long-lived production app but add cookie/CORS complexity for a split deployment.

## Client-side pagination vs server-side (job titles table)

Job title analytics returns all role aggregates; the UI paginates client-side.

**Why:** API returns aggregated rows (far fewer than 10k). Employee list uses server pagination because row count is large.

## Searchable dropdowns with “Other”

Predefined lists match seed constants for data quality; “Other” allows edge cases without maintaining a master-data API.

**Tradeoff:** Free-text “Other” values may fragment filters/analytics until normalized.

## Monorepo layout (apps only)

Server and client are isolated under `apps/` with separate `package.json` files — no root workspace orchestrator.

**Why:** Clear ownership per app, simpler deploy configs (Vercel root = client, Render root = server).

**Tradeoff:** Install dependencies in both folders separately.

## CORS + split deployment

Frontend (Vercel) and API (Render) are on different origins. CORS is enabled only when `CORS_ORIGIN` is set — local dev uses Vite proxy and does not need CORS.

## Premium UI scope

Custom Tailwind components instead of a heavy component library — smaller bundle, full visual control, more implementation time.
