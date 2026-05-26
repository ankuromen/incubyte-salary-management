import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { prisma } from "../lib/prisma.js";

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
  beforeEach(async () => {
    await prisma.employee.deleteMany();
    await request(createApp()).post("/employees").send(employeeOne);
    await request(createApp()).post("/employees").send(employeeTwo);
  });

  it("returns paginated employees", async () => {
    const response = await request(createApp()).get("/employees?page=1&limit=1");

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
    const response = await request(createApp()).get("/employees?country=India");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].country).toBe("India");
  });

  it("filters employees by department", async () => {
    const response = await request(createApp()).get("/employees?department=Product");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].department).toBe("Product");
  });

  it("searches employees by name or email", async () => {
    const response = await request(createApp()).get("/employees?search=jane");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].email).toBe(employeeOne.email);
  });
});

describe("GET /employees/:id", () => {
  beforeEach(async () => {
    await prisma.employee.deleteMany();
  });

  it("returns an employee by id", async () => {
    const created = await request(createApp()).post("/employees").send(employeeOne);
    const response = await request(createApp()).get(`/employees/${created.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(employeeOne.email);
  });

  it("returns 404 when employee does not exist", async () => {
    const response = await request(createApp()).get("/employees/non-existent-id");

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});
