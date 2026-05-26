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

describe("DELETE /employees/:id", () => {
  let employeeId: string;

  beforeEach(async () => {
    await prisma.employee.deleteMany();
    const created = await request(createApp()).post("/employees").send(employeePayload);
    employeeId = created.body.id;
  });

  it("deletes an employee and returns 204", async () => {
    const response = await request(createApp()).delete(`/employees/${employeeId}`);

    expect(response.status).toBe(204);

    const getResponse = await request(createApp()).get(`/employees/${employeeId}`);
    expect(getResponse.status).toBe(404);
  });

  it("returns 404 when employee does not exist", async () => {
    const response = await request(createApp()).delete("/employees/non-existent-id");

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});
