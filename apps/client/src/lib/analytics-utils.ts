import type { OverviewAnalytics } from "../types/analytics";

export const getTotalEmployees = (overview: OverviewAnalytics) =>
  overview.employeeCountByCountry.reduce((sum, item) => sum + item.employeeCount, 0);

export const CHART_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#3b82f6",
  "#14b8a6"
];
