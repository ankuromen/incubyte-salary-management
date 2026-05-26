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

describe("DELETE /employees/:id", () => {
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

  it("deletes an employee and returns 204", async () => {
    const response = await request(app).delete(`/employees/${employeeId}`).set(auth);

    expect(response.status).toBe(204);

    const getResponse = await request(app).get(`/employees/${employeeId}`).set(auth);
    expect(getResponse.status).toBe(404);
  });

  it("returns 404 when employee does not exist", async () => {
    const response = await request(app).delete("/employees/non-existent-id").set(auth);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});
