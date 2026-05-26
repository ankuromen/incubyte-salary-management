import type { z } from "zod";
import { ValidationError } from "../../errors/http-error.js";

export const parseRequestOrThrow = <T>(result: z.ZodSafeParseResult<T>): T => {
  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.issues);
  }

  return result.data;
};
