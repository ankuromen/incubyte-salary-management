import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { CountryAnalytics, JobTitleAnalytics, OverviewAnalytics } from "../../types/analytics";
import { AnalyticsDashboard } from "./AnalyticsDashboard";

const overview: OverviewAnalytics = {
  medianSalary: 100_000,
  employeeCountByCountry: [
    { country: "India", employeeCount: 3 },
    { country: "USA", employeeCount: 2 }
  ],
  salaryDistributionBands: [
    { label: "50k-100k", min: 50_000, max: 100_000, count: 2 },
    { label: "100k-150k", min: 100_000, max: 150_000, count: 3 }
  ],
  departmentSalaryComparison: [
    { department: "Engineering", averageSalary: 125_000, employeeCount: 2 },
    { department: "Sales", averageSalary: 100_000, employeeCount: 2 }
  ]
};

const countryAnalytics: CountryAnalytics[] = [
  { country: "India", minSalary: 60_000, maxSalary: 150_000, averageSalary: 103_333.33 },
  { country: "USA", minSalary: 80_000, maxSalary: 120_000, averageSalary: 100_000 }
];

const jobTitleAnalytics: JobTitleAnalytics[] = [
  { country: "India", jobTitle: "Software Engineer", averageSalary: 100_000 }
];

describe("AnalyticsDashboard", () => {
  it("renders salary insight cards and charts", () => {
    render(
      <AnalyticsDashboard
        countryAnalytics={countryAnalytics}
        jobTitleAnalytics={jobTitleAnalytics}
        overview={overview}
      />
    );

    expect(screen.getByText("Median Salary")).toBeTruthy();
    expect(screen.getByText("Total Employees")).toBeTruthy();
    expect(screen.getByText("Salary Distribution")).toBeTruthy();
    expect(screen.getByText("Country Breakdown")).toBeTruthy();
    expect(screen.getByText("Department Insights")).toBeTruthy();
    expect(screen.getByText("Job Title Averages")).toBeTruthy();
  });

  it("shows country and department analytics data", () => {
    render(
      <AnalyticsDashboard
        countryAnalytics={countryAnalytics}
        jobTitleAnalytics={jobTitleAnalytics}
        overview={overview}
      />
    );

    expect(screen.getAllByText("India").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Engineering").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Software Engineer").length).toBeGreaterThan(0);
  });
});
