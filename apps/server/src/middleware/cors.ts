import type { RequestHandler } from "express";
import { env } from "../config/env.js";

export const corsMiddleware: RequestHandler = (req, res, next) => {
  if (!env.CORS_ORIGIN) {
    next();
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", env.CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
};
