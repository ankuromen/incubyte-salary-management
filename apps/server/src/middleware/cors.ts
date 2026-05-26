import type { RequestHandler } from "express";
import { env } from "../config/env.js";

const getAllowedOrigins = (): string[] => {
  if (!env.CORS_ORIGIN) {
    return [];
  }

  return env.CORS_ORIGIN.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const corsMiddleware: RequestHandler = (req, res, next) => {
  const allowedOrigins = getAllowedOrigins();
  if (allowedOrigins.length === 0) {
    next();
    return;
  }

  const requestOrigin = req.headers.origin;
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
};
