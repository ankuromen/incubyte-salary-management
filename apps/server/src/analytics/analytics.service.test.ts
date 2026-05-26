import { beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../lib/prisma.js";
import { AnalyticsRepository } from "./repository/analytics.repository.js";
import { AnalyticsService } from "./service/analytics.service.js";

const seedAnalyticsEmployees = async () => {
  await prisma.employee.createMany({
    data: [
      {
        fullName: "A One",
        email: "a.one@example.com",
        jobTitle: "Software Engineer",
        country: "India",
        department: "Engineering",
        salary: 100_000,
        dateOfJoining: new Date("2020-01-01")
      },
      {
        fullName: "B Two",
        email: "b.two@example.com",
        jobTitle: "Senior Software Engineer",
        country: "India",
        department: "Engineering",
        salary: 150_000,
        dateOfJoining: new Date("2019-06-01")
      },
      {
        fullName: "C Three",
        email: "c.three@example.com",
        jobTitle: "HR Specialist",
        country: "India",
        department: "Human Resources",
        salary: 60_000,
        dateOfJoining: new Date("2021-03-15")
      },
      {
        fullName: "D Four",
        email: "d.four@example.com",
        jobTitle: "Sales Executive",
        country: "USA",
        department: "Sales",
        salary: 80_000,
        dateOfJoining: new Date("2018-11-20")
      },
      {
        fullName: "E Five",
        email: "e.five@example.com",
        jobTitle: "Sales Executive",
        country: "USA",
        department: "Sales",
        salary: 120_000,
        dateOfJoining: new Date("2022-07-10")
      }
    ]
  });
};

describe("AnalyticsService", () => {
  const service = new AnalyticsService(new AnalyticsRepository(prisma));

  beforeEach(async () => {
    await prisma.employee.deleteMany();
    await seedAnalyticsEmployees();
  });

  describe("getCountryAnalytics", () => {
    it("returns minimum, maximum, and average salary per country", async () => {
      const result = await service.getCountryAnalytics();

      expect(result).toEqual(
        expect.arrayContaining([
          {
            country: "India",
            minSalary: 60_000,
            maxSalary: 150_000,
            averageSalary: 103_333.33
          },
          {
            country: "USA",
            minSalary: 80_000,
            maxSalary: 120_000,
            averageSalary: 100_000
          }
        ])
      );
      expect(result).toHaveLength(2);
    });
  });

  describe("getJobTitleAnalytics", () => {
    it("returns average salary per job title within each country", async () => {
      const result = await service.getJobTitleAnalytics();

      expect(result).toEqual(
        expect.arrayContaining([
          { country: "India", jobTitle: "Software Engineer", averageSalary: 100_000 },
          { country: "India", jobTitle: "Senior Software Engineer", averageSalary: 150_000 },
          { country: "India", jobTitle: "HR Specialist", averageSalary: 60_000 },
          { country: "USA", jobTitle: "Sales Executive", averageSalary: 100_000 }
        ])
      );
      expect(result).toHaveLength(4);
    });
  });

  describe("getOverviewAnalytics", () => {
    it("returns median salary and employee count by country", async () => {
      const result = await service.getOverviewAnalytics();

      expect(result.medianSalary).toBe(100_000);
      expect(result.employeeCountByCountry).toEqual(
        expect.arrayContaining([
          { country: "India", employeeCount: 3 },
          { country: "USA", employeeCount: 2 }
        ])
      );
    });

    it("returns salary distribution bands", async () => {
      const result = await service.getOverviewAnalytics();

      expect(result.salaryDistributionBands.length).toBeGreaterThan(0);
      expect(result.salaryDistributionBands.reduce((sum, band) => sum + band.count, 0)).toBe(5);
    });

    it("returns department salary comparison", async () => {
      const result = await service.getOverviewAnalytics();

      expect(result.departmentSalaryComparison).toEqual(
        expect.arrayContaining([
          { department: "Engineering", averageSalary: 125_000, employeeCount: 2 },
          { department: "Human Resources", averageSalary: 60_000, employeeCount: 1 },
          { department: "Sales", averageSalary: 100_000, employeeCount: 2 }
        ])
      );
    });
  });
});
