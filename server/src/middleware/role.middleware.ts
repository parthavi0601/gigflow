import type { Request, Response, NextFunction, RequestHandler } from "express";
import { ApiError } from "../utils/ApiError";

export const requireRole = (...roles: Array<"admin" | "sales">): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Insufficient permissions"));
    }
    next();
  };
