import { useEffect, useState } from "react";
import {
  fetchCountryAnalytics,
  fetchJobTitleAnalytics,
  fetchOverviewAnalytics
} from "../api/analytics";
import type { CountryAnalytics, JobTitleAnalytics, OverviewAnalytics } from "../types/analytics";

export const useAnalytics = () => {
  const [overview, setOverview] = useState<OverviewAnalytics | null>(null);
  const [countryAnalytics, setCountryAnalytics] = useState<CountryAnalytics[]>([]);
  const [jobTitleAnalytics, setJobTitleAnalytics] = useState<JobTitleAnalytics[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [overviewData, countryData, jobTitleData] = await Promise.all([
          fetchOverviewAnalytics(),
          fetchCountryAnalytics(),
          fetchJobTitleAnalytics()
        ]);
        setOverview(overviewData);
        setCountryAnalytics(countryData);
        setJobTitleAnalytics(jobTitleData);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load analytics");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  return { overview, countryAnalytics, jobTitleAnalytics, error, isLoading };
};
