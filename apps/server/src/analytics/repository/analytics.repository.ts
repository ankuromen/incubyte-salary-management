import type { PrismaClient } from "@prisma/client";
import type { SalaryRecordDto } from "../dto/salary-record.dto.js";
import type { IAnalyticsRepository } from "./analytics.repository.interface.js";

export class AnalyticsRepository implements IAnalyticsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findSalaryRecords(): Promise<SalaryRecordDto[]> {
    return this.prisma.employee.findMany({
      select: {
        country: true,
        department: true,
        jobTitle: true,
        salary: true
      }
    });
  }
}
