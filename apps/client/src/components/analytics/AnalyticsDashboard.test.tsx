import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  it("renders stat cards and chart sections", () => {
    render(
      <AnalyticsDashboard
        countryAnalytics={countryAnalytics}
        jobTitleAnalytics={jobTitleAnalytics}
        overview={overview}
        variant="full"
      />
    );

    expect(screen.getByText("Median Salary")).toBeTruthy();
    expect(screen.getByText("Total Employees")).toBeTruthy();
    expect(screen.getByText("Salary distribution")).toBeTruthy();
    expect(screen.getByText("Employees by country")).toBeTruthy();
    expect(screen.getByText("Department compensation")).toBeTruthy();
    expect(screen.getByText("Country salary comparison")).toBeTruthy();
    expect(screen.getByText("Top roles by average salary")).toBeTruthy();
    expect(screen.getByText("Job title averages")).toBeTruthy();
  });

  it("hides detailed tables in compact mode", () => {
    render(
      <AnalyticsDashboard
        countryAnalytics={countryAnalytics}
        jobTitleAnalytics={jobTitleAnalytics}
        overview={overview}
        variant="compact"
      />
    );

    expect(screen.getByText("Salary distribution")).toBeTruthy();
    expect(screen.queryByText("Job title averages")).toBeNull();
  });

  it("paginates job title averages table", async () => {
    const user = userEvent.setup();
    const manyRoles: JobTitleAnalytics[] = Array.from({ length: 15 }, (_, index) => ({
      country: "India",
      jobTitle: `Role ${index + 1}`,
      averageSalary: 100_000 + index * 1000
    }));

    render(
      <AnalyticsDashboard
        countryAnalytics={countryAnalytics}
        jobTitleAnalytics={manyRoles}
        overview={overview}
        variant="full"
      />
    );

    expect(screen.getByText("Role 1")).toBeTruthy();
    expect(screen.queryByText("Role 11")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Next page" }));

    expect(screen.getByText("Role 11")).toBeTruthy();
    expect(screen.queryByText("Role 1")).toBeNull();
  });

  it("shows country and department data in full mode", () => {
    render(
      <AnalyticsDashboard
        countryAnalytics={countryAnalytics}
        jobTitleAnalytics={jobTitleAnalytics}
        overview={overview}
        variant="full"
      />
    );

    expect(screen.getAllByText("India").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Engineering").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Software Engineer").length).toBeGreaterThan(0);
  });
});
