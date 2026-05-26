import { Prisma } from "@prisma/client";
import { ValidationError } from "../../errors/http-error.js";
import type { CreateEmployeeDto } from "../dto/create-employee.dto.js";
import type { EmployeeDto } from "../dto/employee.dto.js";
import type { EmployeeRepository } from "../repository/employee.repository.js";
import { validateCreateEmployee } from "../validation/employee.validation.js";

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
}
