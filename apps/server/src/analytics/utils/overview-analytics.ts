import { SALARY_BANDS } from "../constants/salary-bands.js";
import type { OverviewAnalyticsDto } from "../dto/overview-analytics.dto.js";
import type { SalaryRecordDto } from "../dto/salary-record.dto.js";

const roundSalary = (value: number) => Number(value.toFixed(2));

const computeMedian = (salaries: number[]): number => {
  if (salaries.length === 0) {
    return 0;
  }

  const sorted = [...salaries].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return roundSalary((sorted[middle - 1]! + sorted[middle]!) / 2);
  }

  return sorted[middle]!;
};

const isSalaryInBand = (salary: number, min: number, max: number | null): boolean => {
  if (max === null) {
    return salary >= min;
  }

  return salary >= min && salary < max;
};

export const computeOverviewAnalytics = (records: SalaryRecordDto[]): OverviewAnalyticsDto => {
  const salaries = records.map((record) => record.salary);

  const employeeCountByCountry = Array.from(
    records.reduce((counts, record) => {
      counts.set(record.country, (counts.get(record.country) ?? 0) + 1);
      return counts;
    }, new Map<string, number>())
  )
    .map(([country, employeeCount]) => ({ country, employeeCount }))
    .sort((left, right) => left.country.localeCompare(right.country));

  const departmentSalaryComparison = Array.from(
    records.reduce((grouped, record) => {
      const current = grouped.get(record.department) ?? { totalSalary: 0, employeeCount: 0 };
      current.totalSalary += record.salary;
      current.employeeCount += 1;
      grouped.set(record.department, current);
      return grouped;
    }, new Map<string, { totalSalary: number; employeeCount: number }>())
  )
    .map(([department, stats]) => ({
      department,
      averageSalary: roundSalary(stats.totalSalary / stats.employeeCount),
      employeeCount: stats.employeeCount
    }))
    .sort((left, right) => left.department.localeCompare(right.department));

  const salaryDistributionBands = SALARY_BANDS.map((band) => ({
    label: band.label,
    min: band.min,
    max: band.max,
    count: salaries.filter((salary) => isSalaryInBand(salary, band.min, band.max)).length
  }));

  return {
    medianSalary: computeMedian(salaries),
    employeeCountByCountry,
    salaryDistributionBands,
    departmentSalaryComparison
  };
};
