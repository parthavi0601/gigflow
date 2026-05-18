import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ZodError } from "zod";
import { env } from "../config/env";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: null,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation error",
      data: err.flatten().fieldErrors,
    });
    return;
  }

  if (err.name === "MongoServerError" && (err as NodeJS.ErrnoException).code === "11000") {
    res.status(409).json({
      success: false,
      message: "Resource already exists",
      data: null,
    });
    return;
  }

  const statusCode = 500;
  const message = env.NODE_ENV === "production" ? "Internal server error" : err.message;

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};
