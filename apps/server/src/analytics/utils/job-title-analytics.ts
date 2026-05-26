import type { JobTitleAnalyticsDto } from "../dto/job-title-analytics.dto.js";
import type { SalaryRecordDto } from "../dto/salary-record.dto.js";

const roundSalary = (value: number) => Number(value.toFixed(2));

export const computeJobTitleAnalytics = (records: SalaryRecordDto[]): JobTitleAnalyticsDto[] => {
  const grouped = new Map<string, number[]>();

  for (const record of records) {
    const key = `${record.country}::${record.jobTitle}`;
    const salaries = grouped.get(key) ?? [];
    salaries.push(record.salary);
    grouped.set(key, salaries);
  }

  return Array.from(grouped.entries())
    .map(([key, salaries]) => {
      const [country, jobTitle] = key.split("::");

      return {
        country,
        jobTitle,
        averageSalary: roundSalary(salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length)
      };
    })
    .sort((left, right) => {
      const countryCompare = left.country.localeCompare(right.country);
      return countryCompare !== 0 ? countryCompare : left.jobTitle.localeCompare(right.jobTitle);
    });
};
