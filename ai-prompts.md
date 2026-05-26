# AI Prompts (Cursor)

Prompts used to build this project with Cursor Agent, grouped by theme. Wording is paraphrased where the original was conversational.

## Phase-driven implementation

1. *Read `docs/cursor-rules.md` and `docs/phase-1-foundation.md`. Implement ONLY that phase. Follow strict TDD. Create commits exactly as specified. Stop after completion.*

2. Repeated for **phases 2–6** with the corresponding `docs/phase-N-foundation.md` files (employee domain, CRUD API, seeding, analytics, frontend UI).

3. *Continue Phase 1 with strict red-green-refactor, exact commit messages, then stop with completion summary.*

## Environment & tooling

- *Create env and manage all variables for server and client.*
- *Fix TypeScript `rootDir` / vitest config error on server.*
- *Fix Tailwind / PostCSS client build error.*
- *Add nodemon for server development.*
- *Restructure repo: server/client only under `apps/`, docs at root — nothing server/client-related outside their folders.*
- *Single common `.gitignore` at repo root.*

## Data & operations

- *Seed employees (10k).*
- *Correct variables in `apps/client/.env` and `apps/server/.env`.*

## UI / UX

- *Make the frontend UI premium for interview submission.*
- *Remove sidebar marketing blurb (“Built for scale…”).*
- *Remove “Add Employee” from left sidebar (keep access elsewhere).*
- *Login for dashboard; admin creds in DB; support multiple admin logins.*
- *Login screen: remove “after seed” text; show default id/password hint.*
- *Custom delete confirmation popup instead of browser `confirm`.*
- *HR dashboard should show analytics; analytics page should use charts/graphs.*
- *Pagination on Job Title Averages table.*
- *Dropdowns for country / department / job title with “Other” manual entry.*
- *Searchable dropdowns for those fields.*

## Assessment & review

- *Does our implementation satisfy `Salary Management Assessment.docx`? What’s left?*
- *Implement `docs/phase-7-foundation.md`.*

## How AI was used

| Practice | Approach |
|----------|----------|
| Scoping | One phase per session; “stop after completion” |
| Quality | TDD on server; component tests on client |
| Refactors | Separate commits for UI polish, auth, analytics |
| Review | Asked for gap analysis against assessment doc before Phase 7 |

## Suggested prompts for reviewers

If extending this project:

- *Add debounced search on employee list.*
- *Add `GET /employees/distinct` for dynamic dropdown options from DB.*
- *Migrate SQLite to PostgreSQL for production.*
- *Add E2E tests with Playwright for login + CRUD smoke path.*
