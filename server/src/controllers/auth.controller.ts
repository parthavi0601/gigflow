import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { registerSchema, loginSchema, verifyOtpSchema } from "../validators/auth.validator";
import * as authService from "../services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const result = await authService.registerUser(data);
  res.status(201).json({ success: true, message: "Registration successful", data: result });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const result = await authService.loginUser(data);
  res.status(200).json({ success: true, message: "Login successful", data: result });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getAuthUser(req.user!.id);
  res.status(200).json({ success: true, message: "User fetched", data: user });
});

export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const data = verifyOtpSchema.parse(req.body);
  const result = await authService.verifyOtp(data.email, data.otp);
  res.status(200).json({ success: true, message: "Verification successful", data: result });
});
