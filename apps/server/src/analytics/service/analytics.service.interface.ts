import type { CountryAnalyticsDto } from "../dto/country-analytics.dto.js";

export interface IAnalyticsService {
  getCountryAnalytics(): Promise<CountryAnalyticsDto[]>;
}
