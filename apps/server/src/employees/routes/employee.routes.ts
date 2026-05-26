import { Router } from "express";
import { asyncHandler } from "../../middleware/error-handler.js";
import type { EmployeeController } from "../controller/employee.controller.js";

export const createEmployeeRouter = (controller: EmployeeController): Router => {
  const router = Router();

  router.post("/", asyncHandler(controller.create));

  return router;
};
