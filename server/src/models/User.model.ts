import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  age: number;
  location: string;
  role: "admin" | "sales";
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other", "Prefer not to say"], required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    role: { type: String, enum: ["admin", "sales"], default: "sales" },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
