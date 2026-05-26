import { Prisma } from "@prisma/client";
import { NotFoundError, ValidationError } from "../../errors/http-error.js";
import type { EmployeeDto } from "../dto/employee.dto.js";
import {
  listEmployeesQuerySchema,
  type PaginatedEmployeesDto
} from "../dto/list-employees-query.dto.js";
import type { EmployeeRepository } from "../repository/employee.repository.js";
import {
  validateCreateEmployee,
  validateUpdateEmployee
} from "../validation/employee.validation.js";

export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async create(input: unknown): Promise<EmployeeDto> {
    const validation = validateCreateEmployee(input);

    if (!validation.success) {
      throw new ValidationError("Validation failed", validation.error.issues);
    }

    try {
      return await this.employeeRepository.create(validation.data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ValidationError("Validation failed", [
          { path: ["email"], message: "email must be unique" }
        ]);
      }

      throw error;
    }
  }

  async list(query: unknown): Promise<PaginatedEmployeesDto> {
    const validation = listEmployeesQuerySchema.safeParse(query);

    if (!validation.success) {
      throw new ValidationError("Validation failed", validation.error.issues);
    }

    const { items, total } = await this.employeeRepository.findMany(validation.data);
    const { page, limit } = validation.data;

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
    const validation = validateUpdateEmployee(input);

    if (!validation.success) {
      throw new ValidationError("Validation failed", validation.error.issues);
    }

    try {
      const employee = await this.employeeRepository.update(id, validation.data);

      if (!employee) {
        throw new NotFoundError();
      }

      return employee;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ValidationError("Validation failed", [
          { path: ["email"], message: "email must be unique" }
        ]);
      }

      throw error;
    }
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
