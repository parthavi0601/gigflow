import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";
import { sendOTP } from "./mail.service";
import type { RegisterInput, LoginInput } from "../validators/auth.validator";

const signToken = (id: string, role: string, email: string): string =>
  jwt.sign({ id, role, email }, env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (data: RegisterInput) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(409, "Email already registered");

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  try {
    await sendOTP(data.email, otp);
  } catch (error) {
    throw new ApiError(500, "Failed to send verification email. Please check server logs.");
  }

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "sales",
    isVerified: false,
    otp,
    otpExpiry,
  });

  return {
    requiresVerification: true,
    email: user.email,
  };
};

export const loginUser = async (data: LoginInput) => {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid credentials");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email first");
  }

  const token = signToken(user._id.toString(), user.role, user.email);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

export const getAuthUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  return { id: user._id, name: user.name, email: user.email, role: user.role };
};

export const verifyOtp = async (email: string, otp: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");
  
  if (user.isVerified) throw new ApiError(400, "User already verified");
  if (user.otp !== otp) throw new ApiError(400, "Invalid verification code");
  if (!user.otpExpiry || user.otpExpiry < new Date()) throw new ApiError(400, "Verification code expired");

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = signToken(user._id.toString(), user.role, user.email);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};
