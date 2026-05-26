# PHASE 4 — EMPLOYEE SEEDING

## Objective

Seed 10,000 employees efficiently.

---

## Requirements

Generate 10,000 employee records.

Names:
Combine:

* first_names.txt
* last_names.txt

Randomize:

* salary
* country
* department
* job title
* joining date

---

## Performance Requirements

Optimize for repeated execution.

Use:

* batch inserts
* transactions
* efficient loops

Target:
Fast execution

---

## Create

seed.ts

Benchmark logging

---

## TDD

Write tests for:

* record generation
* data validity
* count correctness

---

## Commit Order

1. test: add seed generation tests
2. feat: implement employee generator
3. feat: implement batch seed insertion
4. refactor: optimize seed performance

---

Stop after completion.
