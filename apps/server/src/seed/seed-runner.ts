import type { PrismaClient } from "@prisma/client";
import type { CreateEmployeeDto } from "../employees/dto/create-employee.dto.js";

export const DEFAULT_BATCH_SIZE = 1_000;

export type SeedResult = {
  inserted: number;
  durationMs: number;
  skipped: boolean;
};

export const seedEmployees = async (
  prisma: PrismaClient,
  records: CreateEmployeeDto[],
  options?: { batchSize?: number; clearExisting?: boolean }
): Promise<SeedResult> => {
  const batchSize = options?.batchSize ?? DEFAULT_BATCH_SIZE;
  const clearExisting = options?.clearExisting ?? true;
  const startedAt = performance.now();

  if (!clearExisting) {
    const existingCount = await prisma.employee.count();

    if (existingCount >= records.length) {
      return {
        inserted: 0,
        durationMs: performance.now() - startedAt,
        skipped: true
      };
    }
  }

  let inserted = 0;

  await prisma.$transaction(async (transaction) => {
    if (clearExisting) {
      await transaction.employee.deleteMany();
    }

    for (let index = 0; index < records.length; index += batchSize) {
      const batch = records.slice(index, index + batchSize);
      const result = await transaction.employee.createMany({ data: batch });
      inserted += result.count;
    }
  });

  return {
    inserted,
    durationMs: performance.now() - startedAt,
    skipped: false
  };
};
