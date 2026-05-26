import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatSalary } from "../../lib/format";
import { CHART_COLORS } from "../../lib/analytics-utils";
import type {
  CountryAnalytics,
  JobTitleAnalytics,
  OverviewAnalytics,
  SalaryDistributionBand
} from "../../types/analytics";
import { Card } from "../ui/Card";

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 6px -1px rgb(15 23 42 / 0.08)"
};

const tooltipSalary = (value: unknown) => formatSalary(Number(value ?? 0));

type ChartSectionProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
};

const ChartSection = ({ title, subtitle, children, className = "" }: ChartSectionProps) => (
  <Card className={className}>
    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
    <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    <div className="mt-4 h-72">{children}</div>
  </Card>
);

export const SalaryDistributionChart = ({ bands }: { bands: SalaryDistributionBand[] }) => {
  const data = bands.map((band) => ({ name: band.label, employees: band.count }));

  return (
    <ChartSection subtitle="Employee count by compensation band" title="Salary distribution">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Bar dataKey="employees" fill="#6366f1" name="Employees" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export const CountryHeadcountChart = ({
  data
}: {
  data: OverviewAnalytics["employeeCountByCountry"];
}) => {
  const chartData = data.map((item) => ({ name: item.country, value: item.employeeCount }));

  return (
    <ChartSection subtitle="Share of workforce by region" title="Employees by country">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart>
          <Pie
            cx="50%"
            cy="50%"
            data={chartData}
            dataKey="value"
            innerRadius={55}
            nameKey="name"
            outerRadius={95}
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export const DepartmentSalaryChart = ({
  departments
}: {
  departments: OverviewAnalytics["departmentSalaryComparison"];
}) => {
  const data = [...departments]
    .sort((a, b) => b.averageSalary - a.averageSalary)
    .slice(0, 10)
    .map((item) => ({
      name: item.department,
      average: Math.round(item.averageSalary),
      employees: item.employeeCount
    }));

  return (
    <ChartSection subtitle="Top departments by average pay" title="Department compensation">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 12, left: 8, bottom: 4 }}>
          <CartesianGrid horizontal={false} stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis tick={{ fill: "#64748b", fontSize: 11 }} type="number" />
          <YAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} type="category" width={100} />
          <Tooltip contentStyle={chartTooltipStyle} formatter={tooltipSalary} />
          <Bar dataKey="average" fill="#8b5cf6" name="Avg salary" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export const CountryAvgSalaryChart = ({ countries }: { countries: CountryAnalytics[] }) => {
  const data = countries.map((item) => ({
    name: item.country,
    average: Math.round(item.averageSalary)
  }));

  return (
    <ChartSection subtitle="Average salary across operating countries" title="Country salary comparison">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} formatter={tooltipSalary} />
          <Bar dataKey="average" fill="#06b6d4" name="Avg salary" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export const TopRolesChart = ({ roles }: { roles: JobTitleAnalytics[] }) => {
  const data = [...roles]
    .sort((a, b) => b.averageSalary - a.averageSalary)
    .slice(0, 8)
    .map((item) => ({
      name: `${item.jobTitle} (${item.country})`,
      average: Math.round(item.averageSalary)
    }));

  return (
    <ChartSection subtitle="Highest-paying roles (sample)" title="Top roles by average salary">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 48 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis angle={-25} dataKey="name" height={70} interval={0} textAnchor="end" tick={{ fill: "#64748b", fontSize: 10 }} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} formatter={tooltipSalary} />
          <Bar dataKey="average" fill="#10b981" name="Avg salary" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};
