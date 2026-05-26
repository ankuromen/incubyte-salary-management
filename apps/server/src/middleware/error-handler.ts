import type { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError } from "../errors/http-error.js";

export const malformedJsonHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error instanceof SyntaxError && "status" in error && error.status === 400 && "body" in error) {
    res.status(400).json({ error: "Malformed request" });
    return;
  }

  next(error);
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      error: error.message,
      ...(error.details ? { details: error.details } : {})
    });
    return;
  }

  next(error);
};

export const asyncHandler =
  (handler: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
