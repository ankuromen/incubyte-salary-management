import type { CountryAnalytics, JobTitleAnalytics, OverviewAnalytics } from "../../types/analytics";
import { formatSalary } from "../../lib/format";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

type AnalyticsDashboardProps = {
  overview: OverviewAnalytics;
  countryAnalytics: CountryAnalytics[];
  jobTitleAnalytics: JobTitleAnalytics[];
};

const maxBandCount = (bands: OverviewAnalytics["salaryDistributionBands"]) =>
  Math.max(...bands.map((band) => band.count), 1);

export const AnalyticsDashboard = ({
  overview,
  countryAnalytics,
  jobTitleAnalytics
}: AnalyticsDashboardProps) => {
  const totalEmployees = overview.employeeCountByCountry.reduce(
    (sum, item) => sum + item.employeeCount,
    0
  );
  const bandMax = maxBandCount(overview.salaryDistributionBands);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InsightCard
          accent="from-indigo-500 to-violet-600"
          label="Median Salary"
          value={formatSalary(overview.medianSalary)}
        />
        <InsightCard accent="from-blue-500 to-cyan-600" label="Total Employees" value={totalEmployees.toLocaleString()} />
        <InsightCard
          accent="from-emerald-500 to-teal-600"
          label="Countries"
          value={String(overview.employeeCountByCountry.length)}
        />
        <InsightCard
          accent="from-amber-500 to-orange-600"
          label="Departments"
          value={String(overview.departmentSalaryComparison.length)}
        />
      </section>

      <Card>
        <h2 className="text-lg font-bold text-slate-900">Salary Distribution</h2>
        <p className="mt-1 text-sm text-slate-500">Employee count by compensation band</p>
        <div className="mt-6 space-y-4">
          {overview.salaryDistributionBands.map((band) => (
            <div key={band.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">{band.label}</span>
                <span className="tabular-nums text-slate-500">{band.count.toLocaleString()}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                  style={{ width: `${(band.count / bandMax) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card padding={false} className="overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-900">Country Breakdown</h2>
            <p className="text-sm text-slate-500">Min, average, and max by region</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-3">Country</th>
                  <th className="px-4 py-3">Headcount</th>
                  <th className="px-4 py-3">Min</th>
                  <th className="px-4 py-3">Avg</th>
                  <th className="px-6 py-3">Max</th>
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
                      <td className="px-4 py-3 tabular-nums text-slate-700">{count.toLocaleString()}</td>
                      <td className="px-4 py-3 text-slate-600">{formatSalary(country.minSalary)}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{formatSalary(country.averageSalary)}</td>
                      <td className="px-6 py-3 text-slate-600">{formatSalary(country.maxSalary)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold text-slate-900">Department Insights</h2>
          <p className="mt-1 text-sm text-slate-500">Average compensation by team</p>
          <div className="mt-5 space-y-3">
            {overview.departmentSalaryComparison.map((department) => (
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
      </div>

      <Card padding={false} className="overflow-hidden">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">Job Title Averages</h2>
          <p className="text-sm text-slate-500">Compensation by role and country</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-6 py-3">Country</th>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-6 py-3">Average Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobTitleAnalytics.map((item) => (
                <tr key={`${item.country}-${item.jobTitle}`} className="hover:bg-indigo-50/20">
                  <td className="px-6 py-3">
                    <Badge>{item.country}</Badge>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">{item.jobTitle}</td>
                  <td className="px-6 py-3 font-semibold text-slate-900">{formatSalary(item.averageSalary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const InsightCard = ({
  label,
  value,
  accent
}: {
  label: string;
  value: string;
  accent: string;
}) => (
  <article className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
    <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-xl`} />
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
  </article>
);
