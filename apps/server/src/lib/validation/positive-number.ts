import { z } from "zod";

export const positiveNumber = (fieldName: string) =>
  z.number().positive(`${fieldName} must be a positive number`);
