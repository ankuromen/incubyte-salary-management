import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

process.env.NODE_ENV = "test";
process.env.DATABASE_URL = "file:./prisma/test.db";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: unknown;
};

delete globalForPrisma.prisma;

execSync("npx prisma migrate deploy", {
  cwd: serverRoot,
  env: {
    ...process.env,
    DATABASE_URL: "file:./prisma/test.db"
  },
  stdio: "pipe"
});
