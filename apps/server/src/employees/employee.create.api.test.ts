import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { prisma } from "../lib/prisma.js";

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
  beforeEach(async () => {
    await prisma.employee.deleteMany();
  });

  it("creates an employee and returns 201", async () => {
    const response = await request(createApp())
      .post("/employees")
      .send(validEmployeePayload);

    expect(response.status).toBe(201);
    expect(response.body.fullName).toBe(validEmployeePayload.fullName);
    expect(response.body.email).toBe(validEmployeePayload.email);
    expect(response.body.id).toBeDefined();
  });

  it("returns 400 for invalid input", async () => {
    const response = await request(createApp())
      .post("/employees")
      .send({ ...validEmployeePayload, email: "not-an-email" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("returns 400 for malformed JSON body", async () => {
    const response = await request(createApp())
      .post("/employees")
      .set("Content-Type", "application/json")
      .send("{ invalid json");

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
