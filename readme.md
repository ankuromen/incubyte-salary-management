# Salary Management

See **[README.md](README.md)** for full documentation, setup, deployment, and assessment artifacts.

### 2. Client

```bash
cd apps/client
cp .env.example .env
npm install
npm run dev
```

UI: http://localhost:5173 (proxies `/api` → server)

### 3. Login

| Field | Default (after seed) |
|-------|----------------------|
| ID | `admin@company.com` |
| Password | `Admin@123` |

## Tests

```bash
cd apps/server && npm test    # 39 tests
cd apps/client && npm test    # 19+ tests
```

## Documentation

| Document | Purpose |
|----------|---------|
| [architecture.md](architecture.md) | System design, API, frontend structure |
| [tradeoffs.md](tradeoffs.md) | SQLite, batching, auth, UI decisions |
| [performance-notes.md](performance-notes.md) | Seed benchmarks, query strategy |
| [ai-prompts.md](ai-prompts.md) | Cursor / AI usage log |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel + Render setup |
| [docs/DEMO.md](docs/DEMO.md) | Video walkthrough script |

## API overview

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/auth/login` | Login → JWT |
| GET | `/employees` | List (paginated, filters) |
| POST | `/employees` | Create |
| GET/PUT/DELETE | `/employees/:id` | Read / update / delete |
| GET | `/analytics/country` | Min / avg / max by country |
| GET | `/analytics/job-title` | Avg salary by role + country |
| GET | `/analytics/overview` | Median, bands, departments |

Protected routes require `Authorization: Bearer <token>`.

## Assessment alignment

Covers the [Salary Management Assessment](Salary%20Management%20Assessment.docx) requirements: employee CRUD UI, salary insights, 10k seed, E2E stack, tests, incremental commits, and submission artifacts.

## License

Private — assessment submission.
