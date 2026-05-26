import type { CountryAnalyticsDto } from "../dto/country-analytics.dto.js";
import type { JobTitleAnalyticsDto } from "../dto/job-title-analytics.dto.js";

export interface IAnalyticsService {
  getCountryAnalytics(): Promise<CountryAnalyticsDto[]>;
  getJobTitleAnalytics(): Promise<JobTitleAnalyticsDto[]>;
}
