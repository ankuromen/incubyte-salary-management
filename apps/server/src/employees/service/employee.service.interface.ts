import type { EmployeeDto } from "../dto/employee.dto.js";
import type { PaginatedEmployeesDto } from "../dto/list-employees-query.dto.js";

export interface IEmployeeService {
  create(input: unknown): Promise<EmployeeDto>;
  list(query: unknown): Promise<PaginatedEmployeesDto>;
  getById(id: string): Promise<EmployeeDto>;
  update(id: string, input: unknown): Promise<EmployeeDto>;
  delete(id: string): Promise<void>;
}
