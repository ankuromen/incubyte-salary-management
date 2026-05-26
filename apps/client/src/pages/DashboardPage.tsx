import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";

const features = [
  {
    title: "Employee Directory",
    description: "Search, filter, paginate, and manage records across countries and departments.",
    to: "/employees",
    cta: "Browse employees",
    accent: "from-blue-500/10 to-indigo-500/10",
    icon: "👥"
  },
  {
    title: "Onboard Talent",
    description: "Add employees with validated forms and consistent data quality.",
    to: "/employees/new",
    cta: "Add employee",
    accent: "from-violet-500/10 to-purple-500/10",
    icon: "✨"
  },
  {
    title: "Salary Analytics",
    description: "Median pay, distribution bands, and department comparisons at a glance.",
    to: "/analytics",
    cta: "View insights",
    accent: "from-emerald-500/10 to-teal-500/10",
    icon: "📊"
  }
];

export const DashboardPage = () => (
  <div className="space-y-8">
    <header className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 p-8 text-white shadow-elevated md:p-10">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-violet-400/20 blur-2xl" />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">Enterprise HR</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">HR Dashboard</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-indigo-100/90">
          A production-grade salary management workspace — built with TypeScript, TDD, and clean
          architecture for teams scaling to thousands of employees.
        </p>
      </div>
    </header>

    <section className="grid gap-5 md:grid-cols-3">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className={`group relative overflow-hidden bg-gradient-to-br ${feature.accent} transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-elevated`}
        >
          <span className="text-2xl" role="img" aria-hidden>
            {feature.icon}
          </span>
          <h2 className="mt-4 text-lg font-bold text-slate-900">{feature.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
          <Link
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700"
            to={feature.to}
          >
            {feature.cta}
            <span aria-hidden>→</span>
          </Link>
        </Card>
      ))}
    </section>
  </div>
);
