import { Router } from "express";
import { asyncHandler } from "../../middleware/error-handler.js";
import { requireAuth } from "../middleware/require-auth.js";
import type { AuthController } from "../controller/auth.controller.js";

export const createAuthRouter = (controller: AuthController): Router => {
  const router = Router();

  router.post("/login", asyncHandler(controller.login));
  router.get("/me", requireAuth, asyncHandler(controller.me));
  router.get("/admins", requireAuth, asyncHandler(controller.listAdmins));
  router.post("/admins", requireAuth, asyncHandler(controller.createAdmin));

  return router;
};
