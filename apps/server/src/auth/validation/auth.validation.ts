import { z } from "zod";
import { parseRequestOrThrow } from "../../lib/validation/parse-request.js";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required")
});

export const createAdminSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[0-9]/, "Password must include a number"),
  fullName: z.string().min(1, "Full name is required")
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;

export const parseLoginInput = (body: unknown) => parseRequestOrThrow(loginSchema.safeParse(body));
export const parseCreateAdminInput = (body: unknown) =>
  parseRequestOrThrow(createAdminSchema.safeParse(body));
