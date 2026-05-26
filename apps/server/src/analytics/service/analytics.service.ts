import type { CountryAnalyticsDto } from "../dto/country-analytics.dto.js";
import type { JobTitleAnalyticsDto } from "../dto/job-title-analytics.dto.js";
import type { IAnalyticsRepository } from "../repository/analytics.repository.interface.js";
import { computeCountryAnalytics } from "../utils/country-analytics.js";
import { computeJobTitleAnalytics } from "../utils/job-title-analytics.js";
import type { IAnalyticsService } from "./analytics.service.interface.js";

export class AnalyticsService implements IAnalyticsService {
  constructor(private readonly analyticsRepository: IAnalyticsRepository) {}

  async getCountryAnalytics(): Promise<CountryAnalyticsDto[]> {
    const records = await this.analyticsRepository.findSalaryRecords();
    return computeCountryAnalytics(records);
  }

  async getJobTitleAnalytics(): Promise<JobTitleAnalyticsDto[]> {
    const records = await this.analyticsRepository.findSalaryRecords();
    return computeJobTitleAnalytics(records);
  }
}
