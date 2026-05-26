import type { AdminPublic, AuthSession } from "../dto/admin.dto.js";
import type { CreateAdminInput, LoginInput } from "../validation/auth.validation.js";

export type IAuthService = {
  login: (input: LoginInput) => Promise<AuthSession>;
  createAdmin: (input: CreateAdminInput) => Promise<AdminPublic>;
  listAdmins: () => Promise<AdminPublic[]>;
  getAdminById: (id: string) => Promise<AdminPublic>;
};
