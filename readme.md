# Salary Management

Monorepo layout with **self-contained apps** — server and client each own their dependencies, env files, and tooling.

```
salary-management/
├── docs/                 # Phase specs and project docs
├── readme.md
├── apps/
│   ├── server/           # Express API, Prisma, tests
│   └── client/           # React UI, Vite, tests
```

## Environment variables

| App | File | Variables |
|-----|------|-----------|
| **Server** | `apps/server/.env` | `NODE_ENV`, `PORT`, `DATABASE_URL` |
| **Client** | `apps/client/.env` | `VITE_API_BASE_URL` (use `/api` with Vite proxy) |

Server and client each have their own `.env` — do not mix them (Vite only exposes `VITE_*` to the browser).

## Server

```bash
cd apps/server
cp .env.example .env
npm install
npm run prisma:migrate
npm run seed          # optional — 10k employees
npm run dev
```

API: http://localhost:3000

## Client

```bash
cd apps/client
cp .env.example .env
npm install
npm run dev
```

UI: http://localhost:5173 (proxies `/api` → server)

## Tests

```bash
cd apps/server && npm test
cd apps/client && npm test
```
