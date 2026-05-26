import type { z } from "zod";
import type { createEmployeeSchema } from "../validation/employee.validation.js";

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
