import type { PrismaClient } from "@prisma/client";
import type { CreateEmployeeDto } from "../dto/create-employee.dto.js";
import type { EmployeeDto } from "../dto/employee.dto.js";

const toEmployeeDto = (employee: {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string;
  country: string;
  department: string;
  salary: number;
  dateOfJoining: Date;
  createdAt: Date;
  updatedAt: Date;
}): EmployeeDto => employee;

export class EmployeeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateEmployeeDto): Promise<EmployeeDto> {
    const employee = await this.prisma.employee.create({ data });
    return toEmployeeDto(employee);
  }

  async findById(id: string): Promise<EmployeeDto | null> {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    return employee ? toEmployeeDto(employee) : null;
  }
}
