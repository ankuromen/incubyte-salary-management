import "./load-env.js";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1).default("file:./prisma/dev.db"),
  JWT_SECRET: z.string().min(16).default("dev-only-change-in-production"),
  JWT_EXPIRES_IN: z.string().min(1).default("8h"),
  SEED_ADMIN_EMAIL: z.string().email().default("admin@company.com"),
  SEED_ADMIN_PASSWORD: z.string().min(8).default("Admin@123"),
  SEED_ADMIN_NAME: z.string().min(1).default("System Admin"),
  CORS_ORIGIN: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const formatted = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid environment configuration:\n${formatted}`);
}

export const env = parsed.data;
