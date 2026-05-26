import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { prisma } from "../lib/prisma.js";

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
  let employeeId: string;

  beforeEach(async () => {
    await prisma.employee.deleteMany();
    const created = await request(createApp()).post("/employees").send(employeePayload);
    employeeId = created.body.id;
  });

  it("updates an employee and returns 200", async () => {
    const response = await request(createApp())
      .put(`/employees/${employeeId}`)
      .send(updatedPayload);

    expect(response.status).toBe(200);
    expect(response.body.fullName).toBe(updatedPayload.fullName);
    expect(response.body.email).toBe(updatedPayload.email);
    expect(response.body.salary).toBe(updatedPayload.salary);
  });

  it("returns 404 when employee does not exist", async () => {
    const response = await request(createApp())
      .put("/employees/non-existent-id")
      .send(updatedPayload);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  it("returns 400 for invalid input", async () => {
    const response = await request(createApp())
      .put(`/employees/${employeeId}`)
      .send({ ...updatedPayload, salary: -10 });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
