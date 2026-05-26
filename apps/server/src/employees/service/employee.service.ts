import { NotFoundError } from "../../errors/http-error.js";
import { withUniqueEmailHandling } from "../../lib/prisma/handle-prisma-error.js";
import { parseRequestOrThrow } from "../../lib/validation/parse-request.js";
import type { EmployeeDto } from "../dto/employee.dto.js";
import {
  listEmployeesQuerySchema,
  type PaginatedEmployeesDto
} from "../dto/list-employees-query.dto.js";
import type { IEmployeeRepository } from "../repository/employee.repository.interface.js";
import {
  validateCreateEmployee,
  validateUpdateEmployee
} from "../validation/employee.validation.js";
import type { IEmployeeService } from "./employee.service.interface.js";

export class EmployeeService implements IEmployeeService {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  async create(input: unknown): Promise<EmployeeDto> {
    const data = parseRequestOrThrow(validateCreateEmployee(input));

    return withUniqueEmailHandling(() => this.employeeRepository.create(data));
  }

  async list(query: unknown): Promise<PaginatedEmployeesDto> {
    const { page, limit, ...filters } = parseRequestOrThrow(listEmployeesQuerySchema.safeParse(query));
    const { items, total } = await this.employeeRepository.findMany({
      page,
      limit,
      ...filters
    });

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: total === 0 ? 0 : Math.ceil(total / limit)
      }
    };
  }

  async update(id: string, input: unknown): Promise<EmployeeDto> {
    const data = parseRequestOrThrow(validateUpdateEmployee(input));

    return withUniqueEmailHandling(async () => {
      const employee = await this.employeeRepository.update(id, data);

      if (!employee) {
        throw new NotFoundError();
      }

      return employee;
    });
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.employeeRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError();
    }
  }

  async getById(id: string): Promise<EmployeeDto> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) {
      throw new NotFoundError();
    }

    return employee;
  }
}
