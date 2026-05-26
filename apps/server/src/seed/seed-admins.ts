import type { PrismaClient } from "@prisma/client";
import { env } from "../config/env.js";
import { hashPassword } from "../auth/utils/password.js";

export const seedDefaultAdmin = async (prisma: PrismaClient) => {
  const email = env.SEED_ADMIN_EMAIL.toLowerCase();
  const existing = await prisma.admin.findUnique({ where: { email } });

  if (existing) {
    console.log(`[seed] admin already exists: ${email}`);
    return existing;
  }

  const passwordHash = await hashPassword(env.SEED_ADMIN_PASSWORD);
  const admin = await prisma.admin.create({
    data: {
      email,
      fullName: env.SEED_ADMIN_NAME,
      passwordHash
    }
  });

  console.log(`[seed] created default admin: ${email}`);
  return admin;
};
