# PHASE 3 — EMPLOYEE CRUD API

## Objective

Implement employee management APIs.

---

## Endpoints

POST /employees
GET /employees
GET /employees/:id
PUT /employees/:id
DELETE /employees/:id

---

## Features

GET /employees:

* pagination
* search
* country filter
* department filter

---

## Validation

Handle:

* invalid input
* missing employee
* malformed requests

---

## Architecture

Layers:

* controller
* service
* repository

---

## TDD Rules

Write failing API tests before implementation.

---

## Commit Order

1. test: add create employee tests

2. feat: implement create employee

3. test: add list employee tests

4. feat: implement list employees

5. test: add update employee tests

6. feat: implement update employee

7. test: add delete employee tests

8. feat: implement delete employee

9. refactor: improve service architecture

---

Stop after completion.
