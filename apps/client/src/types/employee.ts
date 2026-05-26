export type Employee = {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string;
  country: string;
  department: string;
  salary: number;
  dateOfJoining: string;
  createdAt: string;
  updatedAt: string;
};

export type EmployeePagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedEmployees = {
  data: Employee[];
  pagination: EmployeePagination;
};

export type EmployeeListFilters = {
  search: string;
  country: string;
  department: string;
};
