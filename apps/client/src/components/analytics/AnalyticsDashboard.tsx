import { useState } from "react";
import type { CountryAnalytics, JobTitleAnalytics, OverviewAnalytics } from "../../types/analytics";
import { formatSalary } from "../../lib/format";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { AnalyticsStatCards } from "./AnalyticsStatCards";
import {
  CountryAvgSalaryChart,
  CountryHeadcountChart,
  DepartmentSalaryChart,
  SalaryDistributionChart,
  TopRolesChart
} from "./AnalyticsCharts";

type AnalyticsDashboardProps = {
  overview: OverviewAnalytics;
  countryAnalytics: CountryAnalytics[];
  jobTitleAnalytics: JobTitleAnalytics[];
  variant?: "full" | "compact";
};

export const AnalyticsDashboard = ({
  overview,
  countryAnalytics,
  jobTitleAnalytics,
  variant = "full"
}: AnalyticsDashboardProps) => (
  <div className="space-y-6">
    <AnalyticsStatCards overview={overview} />

    <section className="grid gap-6 lg:grid-cols-2">
      <SalaryDistributionChart bands={overview.salaryDistributionBands} />
      <CountryHeadcountChart data={overview.employeeCountByCountry} />
    </section>

    {variant === "full" ? (
      <>
        <section className="grid gap-6 lg:grid-cols-2">
          <DepartmentSalaryChart departments={overview.departmentSalaryComparison} />
          <CountryAvgSalaryChart countries={countryAnalytics} />
        </section>

        <TopRolesChart roles={jobTitleAnalytics} />

        <div className="grid gap-6 lg:grid-cols-2">
          <CountryTable countryAnalytics={countryAnalytics} overview={overview} />
          <DepartmentList departments={overview.departmentSalaryComparison} />
        </div>

        <JobTitleTable jobTitleAnalytics={jobTitleAnalytics} />
      </>
    ) : null}
  </div>
);

const CountryTable = ({
  overview,
  countryAnalytics
}: {
  overview: OverviewAnalytics;
  countryAnalytics: CountryAnalytics[];
}) => (
  <Card padding={false} className="overflow-hidden">
    <div className="border-b border-slate-100 px-6 py-4">
      <h2 className="text-lg font-bold text-slate-900">Country breakdown</h2>
      <p className="text-sm text-slate-500">Detailed salary stats by region</p>
    </div>
    <div className="max-h-80 overflow-x-auto overflow-y-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="sticky top-0 bg-slate-50/95">
          <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-6 py-3">Country</th>
            <th className="px-4 py-3">Headcount</th>
            <th className="px-4 py-3">Avg</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {countryAnalytics.map((country) => {
            const count =
              overview.employeeCountByCountry.find((item) => item.country === country.country)
                ?.employeeCount ?? 0;

            return (
              <tr key={country.country} className="hover:bg-indigo-50/20">
                <td className="px-6 py-3">
                  <Badge>{country.country}</Badge>
                </td>
                <td className="px-4 py-3 tabular-nums">{count.toLocaleString()}</td>
                <td className="px-4 py-3 font-medium">{formatSalary(country.averageSalary)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </Card>
);

const DepartmentList = ({
  departments
}: {
  departments: OverviewAnalytics["departmentSalaryComparison"];
}) => (
  <Card>
    <h2 className="text-lg font-bold text-slate-900">Department insights</h2>
    <p className="mt-1 text-sm text-slate-500">Average compensation by team</p>
    <div className="mt-5 max-h-80 space-y-3 overflow-y-auto">
      {departments.map((department) => (
        <div
          key={department.department}
          className="flex items-center justify-between rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3"
        >
          <div>
            <p className="font-semibold text-slate-900">{department.department}</p>
            <p className="text-xs text-slate-500">{department.employeeCount.toLocaleString()} employees</p>
          </div>
          <p className="text-sm font-bold text-indigo-600">{formatSalary(department.averageSalary)}</p>
        </div>
      ))}
    </div>
  </Card>
);

const JOB_TITLE_PAGE_SIZE = 10;

const JobTitleTable = ({ jobTitleAnalytics }: { jobTitleAnalytics: JobTitleAnalytics[] }) => {
  const [page, setPage] = useState(1);
  const total = jobTitleAnalytics.length;
  const totalPages = Math.max(1, Math.ceil(total / JOB_TITLE_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * JOB_TITLE_PAGE_SIZE;
  const pageItems = jobTitleAnalytics.slice(start, start + JOB_TITLE_PAGE_SIZE);

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return (
    <Card padding={false} className="overflow-hidden">
      <div className="border-b border-slate-100 px-6 py-4">
        <h2 className="text-lg font-bold text-slate-900">Job title averages</h2>
        <p className="text-sm text-slate-500">Compensation by role and country</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-6 py-3">Country</th>
              <th className="px-4 py-3">Job title</th>
              <th className="px-6 py-3">Average</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pageItems.length === 0 ? (
              <tr>
                <td className="px-6 py-8 text-center text-slate-500" colSpan={3}>
                  No job title data available.
                </td>
              </tr>
            ) : (
              pageItems.map((item) => (
                <tr key={`${item.country}-${item.jobTitle}`} className="hover:bg-indigo-50/20">
                  <td className="px-6 py-3">
                    <Badge>{item.country}</Badge>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.jobTitle}</td>
                  <td className="px-6 py-3 font-semibold">{formatSalary(item.averageSalary)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/50 px-6 py-4">
        <p className="text-sm text-slate-600">
          Page <span className="font-semibold text-slate-900">{safePage}</span> of{" "}
          <span className="font-semibold text-slate-900">{totalPages}</span>
          <span className="text-slate-400"> · </span>
          {total.toLocaleString()} total
        </p>
        <div className="flex gap-2">
          <Button
            aria-label="Previous page"
            disabled={safePage <= 1}
            variant="secondary"
            onClick={() => goToPage(safePage - 1)}
          >
            Previous
          </Button>
          <Button
            aria-label="Next page"
            disabled={safePage >= totalPages}
            variant="secondary"
            onClick={() => goToPage(safePage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};
