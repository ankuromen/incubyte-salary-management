import type { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../lib/prisma.js";
import { AuthController } from "./controller/auth.controller.js";
import { AdminRepository } from "./repository/admin.repository.js";
import { createAuthRouter } from "./routes/auth.routes.js";
import { AuthService } from "./service/auth.service.js";

export const createAuthModule = (prismaClient: PrismaClient = defaultPrisma) => {
  const repository = new AdminRepository(prismaClient);
  const service = new AuthService(repository);
  const controller = new AuthController(service);

  return {
    repository,
    service,
    controller,
    router: createAuthRouter(controller)
  };
};
