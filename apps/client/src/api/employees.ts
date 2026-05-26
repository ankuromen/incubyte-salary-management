import type { Employee, EmployeeListFilters, PaginatedEmployees } from "../types/employee";
import { apiRequest } from "./client";

export type EmployeePayload = {
  fullName: string;
  email: string;
  jobTitle: string;
  country: string;
  department: string;
  salary: number;
  dateOfJoining: string;
};

const buildQuery = (filters: EmployeeListFilters, page: number, limit: number) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit)
  });

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.country) {
    params.set("country", filters.country);
  }

  if (filters.department) {
    params.set("department", filters.department);
  }

  return params.toString();
};

export const fetchEmployees = (
  filters: EmployeeListFilters,
  page: number,
  limit = 10
): Promise<PaginatedEmployees> => {
  return apiRequest<PaginatedEmployees>(`/employees?${buildQuery(filters, page, limit)}`);
};

export const fetchEmployee = (id: string): Promise<Employee> => {
  return apiRequest<Employee>(`/employees/${id}`);
};

export const createEmployee = (payload: EmployeePayload): Promise<Employee> => {
  return apiRequest<Employee>("/employees", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const updateEmployee = (id: string, payload: EmployeePayload): Promise<Employee> => {
  return apiRequest<Employee>(`/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

export const deleteEmployee = (id: string): Promise<void> => {
  return apiRequest<void>(`/employees/${id}`, { method: "DELETE" });
};
