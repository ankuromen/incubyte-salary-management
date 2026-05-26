import type { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../lib/prisma.js";
import { EmployeeController } from "./controller/employee.controller.js";
import { EmployeeRepository } from "./repository/employee.repository.js";
import { createEmployeeRouter } from "./routes/employee.routes.js";
import { EmployeeService } from "./service/employee.service.js";

export const createEmployeeModule = (prismaClient: PrismaClient = defaultPrisma) => {
  const repository = new EmployeeRepository(prismaClient);
  const service = new EmployeeService(repository);
  const controller = new EmployeeController(service);

  return {
    repository,
    service,
    controller,
    router: createEmployeeRouter(controller)
  };
};
