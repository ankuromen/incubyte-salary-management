import type { Express } from "express";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../lib/prisma.js";
import { setupAuthenticatedApp } from "../test/auth-helpers.js";

const validEmployeePayload = {
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  jobTitle: "Software Engineer",
  country: "India",
  department: "Engineering",
  salary: 120000,
  dateOfJoining: "2024-01-15"
};

describe("POST /employees", () => {
  let app: Express;
  let auth: { Authorization: string };

  beforeEach(async () => {
    await prisma.employee.deleteMany();
    await prisma.admin.deleteMany();
    ({ app, auth } = await setupAuthenticatedApp());
  });

  it("creates an employee and returns 201", async () => {
    const response = await request(app)
      .post("/employees")
      .set(auth)
      .send(validEmployeePayload);

    expect(response.status).toBe(201);
    expect(response.body.fullName).toBe(validEmployeePayload.fullName);
    expect(response.body.email).toBe(validEmployeePayload.email);
    expect(response.body.id).toBeDefined();
  });

  it("returns 400 for invalid input", async () => {
    const response = await request(app)
      .post("/employees")
      .set(auth)
      .send({ ...validEmployeePayload, email: "not-an-email" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("returns 400 for malformed JSON body", async () => {
    const response = await request(app)
      .post("/employees")
      .set(auth)
      .set("Content-Type", "application/json")
      .send("{ invalid json");

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
