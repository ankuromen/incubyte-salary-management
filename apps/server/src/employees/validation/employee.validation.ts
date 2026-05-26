import { z } from "zod";

export const createEmployeeSchema = z.object({
  fullName: z.string().trim().min(1, "fullName is required"),
  email: z.string().trim().email("email must be valid"),
  jobTitle: z.string().trim().min(1, "jobTitle is required"),
  country: z.string().trim().min(1, "country is required"),
  department: z.string().trim().min(1, "department is required"),
  salary: z.number().positive("salary must be a positive number"),
  dateOfJoining: z.coerce.date()
});

export const validateCreateEmployee = (input: unknown) => {
  return createEmployeeSchema.safeParse(input);
};
