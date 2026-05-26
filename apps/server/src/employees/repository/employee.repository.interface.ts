import type { CreateEmployeeDto } from "../dto/create-employee.dto.js";
import type { EmployeeDto } from "../dto/employee.dto.js";
import type { ListEmployeesQueryDto } from "../dto/list-employees-query.dto.js";

export interface IEmployeeRepository {
  create(data: CreateEmployeeDto): Promise<EmployeeDto>;
  findById(id: string): Promise<EmployeeDto | null>;
  findMany(query: ListEmployeesQueryDto): Promise<{ items: EmployeeDto[]; total: number }>;
  update(id: string, data: CreateEmployeeDto): Promise<EmployeeDto | null>;
  delete(id: string): Promise<boolean>;
}
