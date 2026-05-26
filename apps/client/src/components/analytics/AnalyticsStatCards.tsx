import { formatSalary } from "../../lib/format";
import type { OverviewAnalytics } from "../../types/analytics";
import { getTotalEmployees } from "../../lib/analytics-utils";

export const AnalyticsStatCards = ({ overview }: { overview: OverviewAnalytics }) => {
  const totalEmployees = getTotalEmployees(overview);

  const stats = [
    { label: "Median Salary", value: formatSalary(overview.medianSalary), accent: "from-indigo-500 to-violet-600" },
    { label: "Total Employees", value: totalEmployees.toLocaleString(), accent: "from-blue-500 to-cyan-600" },
    {
      label: "Countries",
      value: String(overview.employeeCountByCountry.length),
      accent: "from-emerald-500 to-teal-600"
    },
    {
      label: "Departments",
      value: String(overview.departmentSalaryComparison.length),
      accent: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card"
        >
          <div
            className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br ${stat.accent} opacity-10 blur-xl`}
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>
        </article>
      ))}
    </section>
  );
};
