import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  lastMessage: z.string().optional(),
  companyName: z.string().min(2, "Company Name is required"),
  companyDescription: z.string().min(5, "Company Description is required"),
  interestLevel: z.union([z.number(), z.string()]).transform((val) => Number(val)).refine((n) => !isNaN(n) && n >= 1 && n <= 10, { message: "Interest must be 1-10" }),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]),
});

export const updateLeadSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).optional(),
  lastMessage: z.string().optional(),
  companyName: z.string().min(2).optional(),
  companyDescription: z.string().min(5).optional(),
  interestLevel: z.union([z.number(), z.string()]).transform((val) => Number(val)).refine((n) => !isNaN(n) && n >= 1 && n <= 10, { message: "Interest must be 1-10" }).optional(),
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]).optional(),
});

export const leadQuerySchema = z.object({
  status: z.enum(["New", "Contacted", "Qualified", "Lost"]).optional(),
  source: z.enum(["Website", "Instagram", "Referral"]).optional(),
  search: z.string().optional(),
  sort: z.enum(["latest", "oldest"]).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadQueryInput = z.infer<typeof leadQuerySchema>;
