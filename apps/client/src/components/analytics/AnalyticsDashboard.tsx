import type { CountryAnalytics, JobTitleAnalytics, OverviewAnalytics } from "../../types/analytics";

type AnalyticsDashboardProps = {
  overview: OverviewAnalytics;
  countryAnalytics: CountryAnalytics[];
  jobTitleAnalytics: JobTitleAnalytics[];
};

const formatSalary = (salary: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    salary
  );

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
        <InsightCard label="Median Salary" value={formatSalary(overview.medianSalary)} />
        <InsightCard label="Total Employees" value={String(totalEmployees)} />
        <InsightCard
          label="Countries"
          value={String(overview.employeeCountByCountry.length)}
        />
        <InsightCard
          label="Departments"
          value={String(overview.departmentSalaryComparison.length)}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Salary Distribution</h2>
        <div className="mt-4 space-y-3">
          {overview.salaryDistributionBands.map((band) => (
            <div key={band.label}>
              <div className="mb-1 flex justify-between text-sm text-slate-600">
                <span>{band.label}</span>
                <span>{band.count}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-indigo-500"
                  style={{ width: `${(band.count / bandMax) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Country Breakdown</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-2 font-medium">Country</th>
                  <th className="pb-2 font-medium">Employees</th>
                  <th className="pb-2 font-medium">Min</th>
                  <th className="pb-2 font-medium">Avg</th>
                  <th className="pb-2 font-medium">Max</th>
                </tr>
              </thead>
              <tbody>
                {countryAnalytics.map((country) => {
                  const count =
                    overview.employeeCountByCountry.find((item) => item.country === country.country)
                      ?.employeeCount ?? 0;

                  return (
                    <tr key={country.country} className="border-t border-slate-100">
                      <td className="py-2 font-medium">{country.country}</td>
                      <td className="py-2">{count}</td>
                      <td className="py-2">{formatSalary(country.minSalary)}</td>
                      <td className="py-2">{formatSalary(country.averageSalary)}</td>
                      <td className="py-2">{formatSalary(country.maxSalary)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Department Insights</h2>
          <div className="mt-4 space-y-3">
            {overview.departmentSalaryComparison.map((department) => (
              <div
                key={department.department}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-medium text-slate-900">{department.department}</p>
                  <p className="text-slate-500">{department.employeeCount} employees</p>
                </div>
                <p className="font-semibold text-indigo-700">
                  {formatSalary(department.averageSalary)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Job Title Averages</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="pb-2 font-medium">Country</th>
                <th className="pb-2 font-medium">Job Title</th>
                <th className="pb-2 font-medium">Average Salary</th>
              </tr>
            </thead>
            <tbody>
              {jobTitleAnalytics.map((item) => (
                <tr key={`${item.country}-${item.jobTitle}`} className="border-t border-slate-100">
                  <td className="py-2">{item.country}</td>
                  <td className="py-2">{item.jobTitle}</td>
                  <td className="py-2 font-medium">{formatSalary(item.averageSalary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const InsightCard = ({ label, value }: { label: string; value: string }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
  </article>
);
