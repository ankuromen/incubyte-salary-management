import { z } from "zod";
import type { EmployeeDto } from "./employee.dto.js";

export const listEmployeesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
  country: z.string().trim().optional(),
  department: z.string().trim().optional()
});

export type ListEmployeesQueryDto = z.infer<typeof listEmployeesQuerySchema>;

export type PaginatedEmployeesDto = {
  data: EmployeeDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
