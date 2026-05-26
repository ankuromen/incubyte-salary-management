import { z } from "zod";
import { emailField } from "../../lib/validation/email.js";
import { positiveNumber } from "../../lib/validation/positive-number.js";
import { requiredString } from "../../lib/validation/required-string.js";

export const createEmployeeSchema = z.object({
  fullName: requiredString("fullName"),
  email: emailField(),
  jobTitle: requiredString("jobTitle"),
  country: requiredString("country"),
  department: requiredString("department"),
  salary: positiveNumber("salary"),
  dateOfJoining: z.coerce.date()
});

export const validateCreateEmployee = (input: unknown) => {
  return createEmployeeSchema.safeParse(input);
};
