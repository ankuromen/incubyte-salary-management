# PHASE 1 — FOUNDATION SETUP

## Objective

Initialize the full-stack salary management monorepo.

Build project scaffolding only.

Do not implement employee business logic.

---

## Assignment Context

Build a production-grade salary management tool for 10,000 employees.

This phase establishes engineering foundation.

Must reflect:

* TDD
* Incremental commits
* Production-quality architecture
* Clean code

---

## Tech Stack

Backend:

* Node.js
* Express
* TypeScript
* Prisma
* SQLite
* Vitest

Frontend:

* React
* Vite
* TypeScript
* TailwindCSS

---

## Folder Structure

salary-management/
apps/
client/
server/
docs/

---

## Backend Requirements

Create:
apps/server

Setup:

* package.json
* tsconfig
* eslint
* Vitest
* Prisma
* SQLite

Implement:
GET /health

Response:
{
"status": "ok"
}

---

## Frontend Requirements

Create:
apps/client

Setup:

* React
* Vite
* Tailwind
* TypeScript

Create page:

Title:
Salary Management Dashboard

Subtitle:
System initialized successfully

---

## Testing Rules

Strict TDD:

1. Write failing test
2. Implement minimum code
3. Refactor
4. Commit

Backend:
health endpoint test

Frontend:
dashboard render test

---

## Commit Order

1. chore: initialize monorepo structure
2. test: add backend health tests
3. feat: implement health endpoint
4. test: add frontend render tests
5. feat: implement dashboard scaffold
6. refactor: improve configuration

---

## Stop Rule

Stop after completion.

Do not continue to employee features.
