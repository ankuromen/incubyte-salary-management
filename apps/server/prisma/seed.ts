import { prisma } from "../src/lib/prisma.js";
import {
  DEFAULT_SEED_COUNT,
  generateEmployeeRecords
} from "../src/seed/employee-generator.js";
import { seedEmployees } from "../src/seed/seed-runner.js";

const logBenchmark = (label: string, durationMs: number, detail?: string) => {
  const detailSuffix = detail ? ` (${detail})` : "";
  console.log(`[seed] ${label}: ${durationMs.toFixed(2)}ms${detailSuffix}`);
};

const main = async () => {
  const totalStartedAt = performance.now();

  const generationStartedAt = performance.now();
  const records = generateEmployeeRecords(DEFAULT_SEED_COUNT);
  logBenchmark("record generation", performance.now() - generationStartedAt, `${records.length} records`);

  const insertion = await seedEmployees(prisma, records);
  logBenchmark("database insertion", insertion.durationMs, `${insertion.inserted} records inserted`);

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
