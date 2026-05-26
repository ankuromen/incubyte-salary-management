export type CountryAnalytics = {
  country: string;
  minSalary: number;
  maxSalary: number;
  averageSalary: number;
};

export type JobTitleAnalytics = {
  country: string;
  jobTitle: string;
  averageSalary: number;
};

export type SalaryDistributionBand = {
  label: string;
  min: number;
  max: number | null;
  count: number;
};

export type OverviewAnalytics = {
  medianSalary: number;
  employeeCountByCountry: { country: string; employeeCount: number }[];
  salaryDistributionBands: SalaryDistributionBand[];
  departmentSalaryComparison: {
    department: string;
    averageSalary: number;
    employeeCount: number;
  }[];
};
