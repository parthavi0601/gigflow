import { Resend } from "resend";
import { env } from "../config/env";

const resend = new Resend(env.RESEND_API_KEY || process.env.RESEND_API_KEY);

export const sendOTP = async (email: string, otp: string) => {
  if (!env.RESEND_API_KEY && !process.env.RESEND_API_KEY) {
    throw new Error("Email sending failed: RESEND_API_KEY is not configured.");
  }

  // Use the verified domain email, fallback to testing email
  const sender = env.SENDER_EMAIL || process.env.SENDER_EMAIL || "GigFlow Dashboard <onboarding@resend.dev>";

  const { data, error } = await resend.emails.send({
    from: sender,
    to: [email],
    subject: "Your GigFlow Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
        <h2 style="color: #4f46e5;">Welcome to GigFlow!</h2>
        <p style="font-size: 16px; color: #374151;">Use the following OTP to complete your registration:</p>
        <div style="background-color: #f3f4f6; padding: 16px; margin: 24px 0; border-radius: 8px;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #111827;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #6b7280;">This code will expire in 10 minutes.</p>
        <p style="font-size: 12px; color: #9ca3af; margin-top: 32px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend Error:", error);
    throw new Error(error.message);
  }
};
