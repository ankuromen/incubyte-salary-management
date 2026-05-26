# PHASE 2 — EMPLOYEE DOMAIN MODEL

## Objective

Design employee data model.

---

## Employee Schema

Fields:

* id
* fullName
* email
* jobTitle
* country
* department
* salary
* dateOfJoining
* createdAt
* updatedAt

---

## Validation Rules

fullName:
required

email:
valid email

salary:
positive number

country:
required

jobTitle:
required

department:
required

---

## Architecture

Implement:

* Prisma schema
* Validation layer
* Repository pattern
* DTOs

---

## TDD Flow

Write tests first for:

* schema validation
* invalid salary
* invalid email
* missing required fields

---

## Commit Order

1. test: add employee validation tests
2. feat: implement employee schema
3. feat: add prisma migration
4. refactor: extract validation utilities

---

Stop after completion.
