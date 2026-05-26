import type { RequestHandler } from "express";
import { UnauthorizedError } from "../../errors/http-error.js";
import { verifyAccessToken } from "../utils/token.js";

export const requireAuth: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next(new UnauthorizedError("Authentication required"));
    return;
  }

  const token = header.slice("Bearer ".length).trim();

  if (!token) {
    next(new UnauthorizedError("Authentication required"));
    return;
  }

  try {
    req.auth = verifyAccessToken(token);
    next();
  } catch (error) {
    next(error);
  }
};
