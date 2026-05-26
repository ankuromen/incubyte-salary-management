import type { CountryAnalyticsDto } from "../dto/country-analytics.dto.js";
import type { JobTitleAnalyticsDto } from "../dto/job-title-analytics.dto.js";
import type { OverviewAnalyticsDto } from "../dto/overview-analytics.dto.js";

export interface IAnalyticsService {
  getCountryAnalytics(): Promise<CountryAnalyticsDto[]>;
  getJobTitleAnalytics(): Promise<JobTitleAnalyticsDto[]>;
  getOverviewAnalytics(): Promise<OverviewAnalyticsDto>;
}
