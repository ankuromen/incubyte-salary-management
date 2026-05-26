import type { Express } from "express";
import request from "supertest";
import { hashPassword } from "../auth/utils/password.js";
import { prisma } from "../lib/prisma.js";

export const seedTestAdmin = async (
  email = "admin@test.com",
  password = "Admin@123",
  fullName = "Test Admin"
) => {
  await prisma.admin.deleteMany();
  const passwordHash = await hashPassword(password);
  const admin = await prisma.admin.create({
    data: { email: email.toLowerCase(), passwordHash, fullName }
  });
  return { admin, email, password };
};

export const getAuthToken = async (app: Express, email: string, password: string) => {
  const response = await request(app).post("/auth/login").send({ email, password });
  return response.body.token as string;
};

export const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const setupAuthenticatedApp = async () => {
  const { createApp } = await import("../app.js");
  const app = createApp();
  const { email, password } = await seedTestAdmin();
  const token = await getAuthToken(app, email, password);

  return { app, token, auth: authHeader(token), email, password };
};
