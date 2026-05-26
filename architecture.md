# Architecture

Salary Management is a full-stack HR application for managing employee records and compensation analytics at scale (~10,000 employees).

## System design

```
┌─────────────────┐     HTTPS / REST      ┌──────────────────────────────┐
│  React (Vite)   │ ◄──────────────────► │  Express API (TypeScript)     │
│  apps/client    │   JWT Bearer token    │  apps/server                 │
└─────────────────┘                       │  ┌──────────┐  ┌────────────┐ │
                                          │  │ Modules  │  │ Middleware │ │
                                          │  │ auth     │  │ CORS, JSON │ │
                                          │  │ employees│  │ errors     │ │
                                          │  │ analytics│  └────────────┘ │
                                          │  └────┬─────┘                │
                                          │       │ Prisma ORM             │
                                          │       ▼                        │
                                          │  SQLite (better-sqlite3)       │
                                          └──────────────────────────────┘
```

**Request flow**

1. User signs in via `POST /auth/login` → receives JWT.
2. Client stores token and sends `Authorization: Bearer <token>` on protected routes.
3. `requireAuth` middleware validates JWT before employee/analytics handlers run.
4. Controllers parse input (Zod), delegate to services, services use repositories for Prisma access.

## Database choice

**SQLite** via Prisma 7 + `@prisma/adapter-better-sqlite3`.

| Reason | Detail |
|--------|--------|
| Assessment fit | Single-org HR tool, no multi-tenant isolation required |
| Zero ops locally | File-based DB, no Docker services for reviewers |
| Performance | Adequate for 10k rows with indexes and paginated list queries |
| Prisma migrations | Schema versioned under `apps/server/prisma/migrations` |

**Models**

- `Employee` — workforce records (name, email, role, country, department, salary, joining date).
- `Admin` — HR login accounts (email + bcrypt password hash).

## API design

| Area | Endpoints | Auth |
|------|-----------|------|
| Health | `GET /health` | Public |
| Auth | `POST /auth/login`, `GET /auth/me`, `GET/POST /auth/admins` | Mixed |
| Employees | `POST/GET/PUT/DELETE /employees`, `GET /employees/:id` | Protected |
| Analytics | `GET /analytics/country`, `/job-title`, `/overview` | Protected |

**Conventions**

- JSON request/response bodies.
- Validation errors → `400` with `{ error, details? }`.
- Not found → `404`. Unauthorized → `401`.
- List employees supports `page`, `limit`, `search`, `country`, `department` query params.

**Layering (per domain)**

```
routes → controller → service → repository → Prisma
```

Modules are wired in `employee.module.ts`, `analytics.module.ts`, `auth.module.ts` and mounted from `app.ts`.

## Frontend structure

```
apps/client/src/
├── api/              # fetch client + domain API helpers
├── components/
│   ├── analytics/    # charts, dashboard widgets
│   ├── auth/         # protected route wrapper
│   ├── employees/    # table, filters, pagination
│   ├── forms/        # employee form, searchable selects
│   ├── layout/       # sidebar, app shell
│   └── ui/           # buttons, cards, dialogs
├── context/          # AuthProvider (JWT session)
├── hooks/            # useAnalytics
├── pages/            # route-level screens
├── validation/       # Zod schemas (client-side)
└── constants/        # dropdown option lists
```

**Routing**

- `/login` — public.
- Protected shell: `/`, `/employees`, `/employees/new`, `/employees/:id/edit`, `/analytics`, `/admins`.

**Data fetching**

- Dev: Vite proxy `/api` → `localhost:3000`.
- Prod: `VITE_API_BASE_URL` points to deployed API; server `CORS_ORIGIN` allows the Vercel domain.

**UI stack**

- React 19 + React Router 7 + Tailwind CSS 4 + Recharts for analytics visualizations.
