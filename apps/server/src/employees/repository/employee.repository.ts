import type { Prisma, PrismaClient } from "@prisma/client";
import type { CreateEmployeeDto } from "../dto/create-employee.dto.js";
import type { EmployeeDto } from "../dto/employee.dto.js";
import type { ListEmployeesQueryDto } from "../dto/list-employees-query.dto.js";

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

  async findMany(
    query: ListEmployeesQueryDto
  ): Promise<{ items: EmployeeDto[]; total: number }> {
    const where = this.buildListWhereClause(query);

    const [items, total] = await Promise.all([
      this.prisma.employee.findMany({
        where,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        orderBy: { createdAt: "desc" }
      }),
      this.prisma.employee.count({ where })
    ]);

    return {
      items: items.map(toEmployeeDto),
      total
    };
  }

  private buildListWhereClause(query: ListEmployeesQueryDto): Prisma.EmployeeWhereInput {
    const filters: Prisma.EmployeeWhereInput[] = [];

    if (query.country) {
      filters.push({ country: query.country });
    }

    if (query.department) {
      filters.push({ department: query.department });
    }

    if (query.search) {
      filters.push({
        OR: [
          { fullName: { contains: query.search } },
          { email: { contains: query.search } }
        ]
      });
    }

    return filters.length > 0 ? { AND: filters } : {};
  }
}
