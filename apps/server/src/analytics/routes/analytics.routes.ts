import { Router } from "express";
import { asyncHandler } from "../../middleware/error-handler.js";
import type { AnalyticsController } from "../controller/analytics.controller.js";

export const createAnalyticsRouter = (controller: AnalyticsController): Router => {
  const router = Router();

  router.get("/country", asyncHandler(controller.getCountryAnalytics));
  router.get("/job-title", asyncHandler(controller.getJobTitleAnalytics));

  return router;
};
