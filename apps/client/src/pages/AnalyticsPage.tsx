import { AnalyticsDashboard } from "../components/analytics/AnalyticsDashboard";
import { Alert } from "../components/ui/Alert";
import { PageHeader } from "../components/ui/PageHeader";
import { useAnalytics } from "../hooks/useAnalytics";

export const AnalyticsPage = () => {
  const { overview, countryAnalytics, jobTitleAnalytics, error, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          subtitle="Charts and tables for compensation, geography, and roles."
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
        subtitle="Interactive charts and detailed tables for compensation insights."
        title="Analytics"
      />
      <AnalyticsDashboard
        countryAnalytics={countryAnalytics}
        jobTitleAnalytics={jobTitleAnalytics}
        overview={overview}
        variant="full"
      />
    </div>
  );
};
