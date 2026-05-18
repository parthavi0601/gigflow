import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";
import type { RegisterInput, LoginInput } from "../validators/auth.validator";

const signToken = (id: string, role: string, email: string): string =>
  jwt.sign({ id, role, email }, env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (data: RegisterInput) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new ApiError(409, "Email already registered");

  const hashedPassword = await bcrypt.hash(data.password, 12);
  const user = await User.create({ ...data, password: hashedPassword });
  const token = signToken(user._id.toString(), user.role, user.email);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

export const loginUser = async (data: LoginInput) => {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid credentials");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new ApiError(401, "Invalid credentials");

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
