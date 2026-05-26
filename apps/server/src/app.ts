import express from "express";
import { createAnalyticsModule } from "./analytics/analytics.module.js";
import { createAuthModule } from "./auth/auth.module.js";
import { requireAuth } from "./auth/middleware/require-auth.js";
import { createEmployeeModule } from "./employees/employee.module.js";
import { corsMiddleware } from "./middleware/cors.js";
import { errorHandler, malformedJsonHandler } from "./middleware/error-handler.js";

export const createApp = () => {
  const app = express();
  const { router: authRouter } = createAuthModule();
  const { router: employeeRouter } = createEmployeeModule();
  const { router: analyticsRouter } = createAnalyticsModule();

  app.use(corsMiddleware);
  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });
  app.use("/auth", authRouter);
  app.use("/employees", requireAuth, employeeRouter);
  app.use("/analytics", requireAuth, analyticsRouter);
  app.use(malformedJsonHandler);
  app.use(errorHandler);

  return app;
};
