import type { PrismaClient } from "@prisma/client";
import type { CreateAdminInput } from "../validation/auth.validation.js";
import type { IAdminRepository } from "./admin.repository.interface.js";

export class AdminRepository implements IAdminRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findByEmail = (email: string) => {
    return this.prisma.admin.findUnique({ where: { email: email.toLowerCase() } });
  };

  findById = (id: string) => {
    return this.prisma.admin.findUnique({ where: { id } });
  };

  list = () => {
    return this.prisma.admin.findMany({ orderBy: { createdAt: "asc" } });
  };

  create = (input: CreateAdminInput, passwordHash: string) => {
    return this.prisma.admin.create({
      data: {
        email: input.email.toLowerCase(),
        fullName: input.fullName,
        passwordHash
      }
    });
  };
}
