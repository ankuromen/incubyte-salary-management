import type { PrismaClient } from "@prisma/client";
import { prisma as defaultPrisma } from "../lib/prisma.js";
import { AnalyticsController } from "./controller/analytics.controller.js";
import { AnalyticsRepository } from "./repository/analytics.repository.js";
import { createAnalyticsRouter } from "./routes/analytics.routes.js";
import { AnalyticsService } from "./service/analytics.service.js";

export const createAnalyticsModule = (prismaClient: PrismaClient = defaultPrisma) => {
  const repository = new AnalyticsRepository(prismaClient);
  const service = new AnalyticsService(repository);
  const controller = new AnalyticsController(service);

  return {
    repository,
    service,
    controller,
    router: createAnalyticsRouter(controller)
  };
};
