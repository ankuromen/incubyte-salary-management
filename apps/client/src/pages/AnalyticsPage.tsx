import { useEffect, useState } from "react";
import {
  fetchCountryAnalytics,
  fetchJobTitleAnalytics,
  fetchOverviewAnalytics
} from "../api/analytics";
import { AnalyticsDashboard } from "../components/analytics/AnalyticsDashboard";
import type { CountryAnalytics, JobTitleAnalytics, OverviewAnalytics } from "../types/analytics";

export const AnalyticsPage = () => {
  const [overview, setOverview] = useState<OverviewAnalytics | null>(null);
  const [countryAnalytics, setCountryAnalytics] = useState<CountryAnalytics[]>([]);
  const [jobTitleAnalytics, setJobTitleAnalytics] = useState<JobTitleAnalytics[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
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

    void loadAnalytics();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-slate-600">Loading analytics...</p>;
  }

  if (error || !overview) {
    return <p className="text-sm text-red-600">{error ?? "Analytics unavailable"}</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
      <AnalyticsDashboard
        countryAnalytics={countryAnalytics}
        jobTitleAnalytics={jobTitleAnalytics}
        overview={overview}
      />
    </div>
  );
};
