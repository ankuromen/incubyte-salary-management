import type { Express } from "express";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../lib/prisma.js";
import { setupAuthenticatedApp } from "../test/auth-helpers.js";

const employeePayload = {
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  jobTitle: "Software Engineer",
  country: "India",
  department: "Engineering",
  salary: 120000,
  dateOfJoining: "2024-01-15"
};

const updatedPayload = {
  fullName: "Jane Updated",
  email: "jane.updated@example.com",
  jobTitle: "Senior Software Engineer",
  country: "India",
  department: "Engineering",
  salary: 140000,
  dateOfJoining: "2024-01-15"
};

describe("PUT /employees/:id", () => {
  let app: Express;
  let auth: { Authorization: string };
  let employeeId: string;

  beforeEach(async () => {
    await prisma.employee.deleteMany();
    await prisma.admin.deleteMany();
    ({ app, auth } = await setupAuthenticatedApp());
    const created = await request(app).post("/employees").set(auth).send(employeePayload);
    employeeId = created.body.id;
  });

  it("updates an employee and returns 200", async () => {
    const response = await request(app).put(`/employees/${employeeId}`).set(auth).send(updatedPayload);

    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe(updatedPayload.fullName);
    expect(response.body.email).toBe(updatedPayload.email);
    expect(response.body.salary).toBe(updatedPayload.salary);
  });

  it("returns 404 when employee does not exist", async () => {
    const response = await request(app)
      .put("/employees/non-existent-id")
      .set(auth)
      .send(updatedPayload);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  it("returns 400 for invalid input", async () => {
    const response = await request(app)
      .put(`/employees/${employeeId}`)
      .set(auth)
      .send({ ...updatedPayload, salary: -10 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
