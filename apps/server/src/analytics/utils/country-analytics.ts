import type { CountryAnalyticsDto } from "../dto/country-analytics.dto.js";
import type { SalaryRecordDto } from "../dto/salary-record.dto.js";

const roundSalary = (value: number) => Number(value.toFixed(2));

export const computeCountryAnalytics = (records: SalaryRecordDto[]): CountryAnalyticsDto[] => {
  const grouped = new Map<string, number[]>();

  for (const record of records) {
    const salaries = grouped.get(record.country) ?? [];
    salaries.push(record.salary);
    grouped.set(record.country, salaries);
  }

  return Array.from(grouped.entries())
    .map(([country, salaries]) => ({
      country,
      minSalary: Math.min(...salaries),
      maxSalary: Math.max(...salaries),
      averageSalary: roundSalary(salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length)
    }))
    .sort((left, right) => left.country.localeCompare(right.country));
};
