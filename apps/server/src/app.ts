import express from "express";
import { createAnalyticsModule } from "./analytics/analytics.module.js";
import { createEmployeeModule } from "./employees/employee.module.js";
import { errorHandler, malformedJsonHandler } from "./middleware/error-handler.js";

export const createApp = () => {
  const app = express();
  const { router: employeeRouter } = createEmployeeModule();
  const { router: analyticsRouter } = createAnalyticsModule();

  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });
  app.use("/employees", employeeRouter);
  app.use("/analytics", analyticsRouter);
  app.use(malformedJsonHandler);
  app.use(errorHandler);

  return app;
};
