export type SalaryDistributionBandDto = {
  label: string;
  min: number;
  max: number | null;
  count: number;
};

export type EmployeeCountByCountryDto = {
  country: string;
  employeeCount: number;
};

export type DepartmentSalaryComparisonDto = {
  department: string;
  averageSalary: number;
  employeeCount: number;
};

export type OverviewAnalyticsDto = {
  medianSalary: number;
  employeeCountByCountry: EmployeeCountByCountryDto[];
  salaryDistributionBands: SalaryDistributionBandDto[];
  departmentSalaryComparison: DepartmentSalaryComparisonDto[];
};
