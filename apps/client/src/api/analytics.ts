import type { CountryAnalytics, JobTitleAnalytics, OverviewAnalytics } from "../types/analytics";
import { apiRequest } from "./client";

export const fetchCountryAnalytics = (): Promise<CountryAnalytics[]> => {
  return apiRequest<CountryAnalytics[]>("/analytics/country");
};

export const fetchJobTitleAnalytics = (): Promise<JobTitleAnalytics[]> => {
  return apiRequest<JobTitleAnalytics[]>("/analytics/job-title");
};

export const fetchOverviewAnalytics = (): Promise<OverviewAnalytics> => {
  return apiRequest<OverviewAnalytics>("/analytics/overview");
};
