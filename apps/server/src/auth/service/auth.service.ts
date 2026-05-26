import type { Admin } from "@prisma/client";
import { ConflictError, UnauthorizedError } from "../../errors/http-error.js";
import type { AdminPublic, AuthSession } from "../dto/admin.dto.js";
import type { IAdminRepository } from "../repository/admin.repository.interface.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { signAccessToken } from "../utils/token.js";
import type { CreateAdminInput, LoginInput } from "../validation/auth.validation.js";
import type { IAuthService } from "./auth.service.interface.js";

const toAdminPublic = (admin: Admin): AdminPublic => ({
  id: admin.id,
  email: admin.email,
  fullName: admin.fullName,
  createdAt: admin.createdAt.toISOString()
});

export class AuthService implements IAuthService {
  constructor(private readonly adminRepository: IAdminRepository) {}

  login = async (input: LoginInput): Promise<AuthSession> => {
    const admin = await this.adminRepository.findByEmail(input.email);

    if (!admin || !(await verifyPassword(input.password, admin.passwordHash))) {
      throw new UnauthorizedError("Invalid email or password");
    }

    return {
      token: signAccessToken({ adminId: admin.id, email: admin.email }),
      admin: toAdminPublic(admin)
    };
  };

  createAdmin = async (input: CreateAdminInput): Promise<AdminPublic> => {
    const existing = await this.adminRepository.findByEmail(input.email);

    if (existing) {
      throw new ConflictError("An admin with this email already exists");
    }

    const passwordHash = await hashPassword(input.password);
    const admin = await this.adminRepository.create(input, passwordHash);
    return toAdminPublic(admin);
  };

  listAdmins = async (): Promise<AdminPublic[]> => {
    const admins = await this.adminRepository.list();
    return admins.map(toAdminPublic);
  };

  getAdminById = async (id: string): Promise<AdminPublic> => {
    const admin = await this.adminRepository.findById(id);

    if (!admin) {
      throw new UnauthorizedError("Admin not found");
    }

    return toAdminPublic(admin);
  };
}
