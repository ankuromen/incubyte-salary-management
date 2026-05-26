import { z } from "zod";

export const employeeFormSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().email("Enter a valid email"),
  jobTitle: z.string().trim().min(1, "Job title is required"),
  country: z.string().trim().min(1, "Country is required"),
  department: z.string().trim().min(1, "Department is required"),
  salary: z.coerce.number().positive("Salary must be a positive number"),
  dateOfJoining: z.string().min(1, "Joining date is required")
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

export const defaultEmployeeFormValues: EmployeeFormValues = {
  fullName: "",
  email: "",
  jobTitle: "",
  country: "",
  department: "",
  salary: 0,
  dateOfJoining: ""
};
