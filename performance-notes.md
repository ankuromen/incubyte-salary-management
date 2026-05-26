# Performance Notes

## Employee seeding (~10,000 records)

Measured locally after migrations (representative run):

| Stage | Typical duration |
|-------|------------------|
| Record generation (in-memory) | ~5–15 ms |
| DB insertion (batched) | ~10–20 s |
| Total seed | ~10–20 s |

**Optimizations applied**

1. **Batch `createMany`** — default batch size `1,000` (`DEFAULT_BATCH_SIZE` in `seed-runner.ts`).
2. **Single transaction** — delete + batched inserts in one Prisma transaction for consistency and fewer fsync round-trips.
3. **Skip if seeded** — if employee count ≥ 10,000, skip insertion (idempotent for CI/reviewers).
4. **In-memory generation** — names from `first_names.txt` / `last_names.txt` before any DB I/O.

**Not done (unnecessary at this scale)**

- Raw SQL bulk insert (Prisma batching was sufficient).
- Parallel workers (SQLite write locking favors single-writer batches).

## API list endpoint

- **Pagination** — default `limit=10`, indexed queries on Prisma.
- **Filters** — `search`, `country`, `department` applied in repository with `WHERE` clauses.
- **Count query** — separate `count` for total pages (trade accuracy vs one round-trip).

## Analytics

- Aggregations run in SQL via Prisma (`groupBy`, aggregates) — not loading 10k rows into Node for overview stats.
- Job title endpoint returns one row per (country, job title) pair — smaller payload than raw employees.

## Frontend

- Dashboard **compact** analytics loads same APIs as full analytics page — acceptable for demo; could cache in context if needed.
- Recharts bundle is the largest client chunk — consider lazy-loading `/analytics` route in a future iteration.
- Employee table re-fetches on filter change — debouncing search input would reduce API calls (not implemented).

## Tests

- Vitest with isolated SQLite test DB (`prisma/test.db`).
- `fileParallelism: false` on server tests to avoid DB contention.
- API tests use `setupAuthenticatedApp` helper — single admin seed per test file `beforeEach`.

## Production deployment

- SQLite on Render uses a **persistent disk** mount (`/var/data`) so data survives redeploys.
- Run `prisma migrate deploy` on start (`start:prod` script) — no `migrate dev` in production.
