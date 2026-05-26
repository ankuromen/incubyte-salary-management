import type { Express } from "express";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../lib/prisma.js";
import { setupAuthenticatedApp } from "../test/auth-helpers.js";

const employeeOne = {
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  jobTitle: "Software Engineer",
  country: "India",
  department: "Engineering",
  salary: 120000,
  dateOfJoining: "2024-01-15"
};

const employeeTwo = {
  fullName: "John Smith",
  email: "john.smith@example.com",
  jobTitle: "Product Manager",
  country: "USA",
  department: "Product",
  salary: 150000,
  dateOfJoining: "2023-06-01"
};

describe("GET /employees", () => {
  let app: Express;
  let auth: { Authorization: string };

  beforeEach(async () => {
    await prisma.employee.deleteMany();
    await prisma.admin.deleteMany();
    ({ app, auth } = await setupAuthenticatedApp());
    await request(app).post("/employees").set(auth).send(employeeOne);
    await request(app).post("/employees").set(auth).send(employeeTwo);
  });

  it("returns paginated employees", async () => {
    const response = await request(app).get("/employees?page=1&limit=1").set(auth);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.pagination).toEqual({
      page: 1,
      limit: 1,
      total: 2,
      totalPages: 2
    });
  });

  it("filters employees by country", async () => {
    const response = await request(app).get("/employees?country=India").set(auth);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].country).toBe("India");
  });

  it("filters employees by department", async () => {
    const response = await request(app).get("/employees?department=Product").set(auth);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].department).toBe("Product");
  });

  it("searches employees by name or email", async () => {
    const response = await request(app).get("/employees?search=jane").set(auth);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].email).toBe(employeeOne.email);
  });
});

describe("GET /employees/:id", () => {
  let app: Express;
  let auth: { Authorization: string };

  beforeEach(async () => {
    await prisma.employee.deleteMany();
    await prisma.admin.deleteMany();
    ({ app, auth } = await setupAuthenticatedApp());
  });

  it("returns an employee by id", async () => {
    const created = await request(app).post("/employees").set(auth).send(employeeOne);
    const response = await request(app).get(`/employees/${created.body.id}`).set(auth);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(employeeOne.email);
  });

  it("returns 404 when employee does not exist", async () => {
    const response = await request(app).get("/employees/non-existent-id").set(auth);

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});
