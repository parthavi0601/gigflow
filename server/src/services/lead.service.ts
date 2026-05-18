import { Lead } from "../models/Lead.model";
import { ApiError } from "../utils/ApiError";
import type { CreateLeadInput, UpdateLeadInput, LeadQueryInput } from "../validators/lead.validator";

const buildQuery = (filters: LeadQueryInput) => {
  const query: Record<string, unknown> = {};

  if (filters.status) query["status"] = filters.status;
  if (filters.source) query["source"] = filters.source;
  if (filters.search) {
    query["$or"] = [
      { name: { $regex: filters.search, $options: "i" } },
      { email: { $regex: filters.search, $options: "i" } },
    ];
  }

  return query;
};

export const getLeads = async (filters: LeadQueryInput) => {
  const page = Math.max(1, parseInt(filters.page ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(filters.limit ?? "10", 10)));
  const skip = (page - 1) * limit;
  const sort = filters.sort === "oldest" ? 1 : -1;

  const query = buildQuery(filters);

  const [leads, total] = await Promise.all([
    Lead.find(query)
      .populate("createdBy", "name email role")
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(limit),
    Lead.countDocuments(query),
  ]);

  return {
    leads,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

export const getLeadById = async (id: string) => {
  const lead = await Lead.findById(id).populate("createdBy", "name email role");
  if (!lead) throw new ApiError(404, "Lead not found");
  return lead;
};

export const createLead = async (data: CreateLeadInput, userId: string) => {
  return Lead.create({ ...data, createdBy: userId });
};

export const updateLead = async (id: string, data: UpdateLeadInput) => {
  const lead = await Lead.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate(
    "createdBy",
    "name email role"
  );
  if (!lead) throw new ApiError(404, "Lead not found");
  return lead;
};

export const deleteLead = async (id: string) => {
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) throw new ApiError(404, "Lead not found");
};

export const exportLeads = async (filters: LeadQueryInput) => {
  const query = buildQuery(filters);
  return Lead.find(query).populate("createdBy", "name email").sort({ createdAt: -1 }).lean();
};

export const getLeadStats = async () => {
  const [total, grouped] = await Promise.all([
    Lead.countDocuments(),
    Lead.aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);

  const counts: Record<string, number> = {};
  for (const row of grouped) counts[row._id] = row.count;

  return {
    total,
    new: counts["New"] ?? 0,
    contacted: counts["Contacted"] ?? 0,
    qualified: counts["Qualified"] ?? 0,
    lost: counts["Lost"] ?? 0,
  };
};
