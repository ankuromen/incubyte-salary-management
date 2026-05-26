import type { SalaryRecordDto } from "../dto/salary-record.dto.js";

export interface IAnalyticsRepository {
  findSalaryRecords(): Promise<SalaryRecordDto[]>;
}
