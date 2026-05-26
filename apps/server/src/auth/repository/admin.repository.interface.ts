import type { Admin } from "@prisma/client";
import type { CreateAdminInput } from "../validation/auth.validation.js";

export type IAdminRepository = {
  findByEmail: (email: string) => Promise<Admin | null>;
  findById: (id: string) => Promise<Admin | null>;
  list: () => Promise<Admin[]>;
  create: (input: CreateAdminInput, passwordHash: string) => Promise<Admin>;
};
