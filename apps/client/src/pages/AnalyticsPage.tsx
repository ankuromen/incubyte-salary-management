import { useEffect, useState } from "react";
import {
  fetchCountryAnalytics,
  fetchJobTitleAnalytics,
  fetchOverviewAnalytics
} from "../api/analytics";
import { AnalyticsDashboard } from "../components/analytics/AnalyticsDashboard";
import { Alert } from "../components/ui/Alert";
import { PageHeader } from "../components/ui/PageHeader";
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
    return (
      <div className="space-y-6">
        <PageHeader
          subtitle="Compensation insights across countries, departments, and roles."
          title="Analytics"
        />
        <div className="flex flex-col items-center justify-center gap-4 py-24">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500">Loading analytics…</p>
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="space-y-6">
        <PageHeader title="Analytics" />
        <Alert>{error ?? "Analytics unavailable"}</Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        subtitle="Compensation insights across countries, departments, and roles."
        title="Analytics"
      />
      <AnalyticsDashboard
        countryAnalytics={countryAnalytics}
        jobTitleAnalytics={jobTitleAnalytics}
        overview={overview}
      />
    </div>
  );
};
