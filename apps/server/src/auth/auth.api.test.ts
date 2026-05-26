import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { prisma } from "../lib/prisma.js";
import { authHeader, getAuthToken, seedTestAdmin } from "../test/auth-helpers.js";

describe("Auth API", () => {
  beforeEach(async () => {
    await prisma.admin.deleteMany();
    await prisma.employee.deleteMany();
  });

  it("logs in with valid credentials", async () => {
    const app = createApp();
    const { email, password } = await seedTestAdmin();

    const response = await request(app).post("/auth/login").send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.admin.email).toBe(email);
  });

  it("rejects invalid credentials", async () => {
    const app = createApp();
    await seedTestAdmin();

    const response = await request(app)
      .post("/auth/login")
      .send({ email: "admin@test.com", password: "wrong-password" });

    expect(response.status).toBe(401);
  });

  it("creates a new admin when authenticated", async () => {
    const app = createApp();
    const { email, password } = await seedTestAdmin();
    const token = await getAuthToken(app, email, password);

    const response = await request(app)
      .post("/auth/admins")
      .set(authHeader(token))
      .send({
        email: "hr@company.com",
        password: "HrAdmin123",
        fullName: "HR Admin"
      });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe("hr@company.com");
  });

  it("lists admins when authenticated", async () => {
    const app = createApp();
    const { email, password } = await seedTestAdmin();
    const token = await getAuthToken(app, email, password);

    const response = await request(app).get("/auth/admins").set(authHeader(token));

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("requires auth for employee routes", async () => {
    const app = createApp();

    const response = await request(app).get("/employees");

    expect(response.status).toBe(401);
  });
});
