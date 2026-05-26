import { prisma } from "../src/lib/prisma.js";
import { seedDefaultAdmin } from "../src/seed/seed-admins.js";
import { logBenchmark } from "../src/seed/benchmark.js";
import {
  DEFAULT_SEED_COUNT,
  generateEmployeeRecords
} from "../src/seed/employee-generator.js";
import { seedEmployees } from "../src/seed/seed-runner.js";

const main = async () => {
  const totalStartedAt = performance.now();

  await seedDefaultAdmin(prisma);

  const generationStartedAt = performance.now();
  const records = generateEmployeeRecords(DEFAULT_SEED_COUNT);
  logBenchmark("record generation", performance.now() - generationStartedAt, `${records.length} records`);

  const insertion = await seedEmployees(prisma, records);

  if (insertion.skipped) {
    console.log(`[seed] database already contains at least ${DEFAULT_SEED_COUNT} employees; skipping insertion`);
  } else {
    logBenchmark("database insertion", insertion.durationMs, `${insertion.inserted} records inserted`);
  }

  logBenchmark("total seed duration", performance.now() - totalStartedAt);
};

main()
  .catch((error) => {
    console.error("[seed] failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
