import type { Request, Response } from "express";
import { AsyncParser } from "@json2csv/node";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createLeadSchema,
  updateLeadSchema,
  leadQuerySchema,
} from "../validators/lead.validator";
import * as leadService from "../services/lead.service";

export const getLeadStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await leadService.getLeadStats();
  res.status(200).json({ success: true, message: "Stats fetched", data: stats });
});

export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const filters = leadQuerySchema.parse(req.query);
  const result = await leadService.getLeads(filters);
  res.status(200).json({
    success: true,
    message: "Leads fetched",
    data: result.leads,
    pagination: result.pagination,
  });
});

export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(req.params["id"] as string);
  res.status(200).json({ success: true, message: "Lead fetched", data: lead });
});

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const data = createLeadSchema.parse(req.body);
  const lead = await leadService.createLead(data, req.user!.id);
  res.status(201).json({ success: true, message: "Lead created", data: lead });
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const data = updateLeadSchema.parse(req.body);
  const lead = await leadService.updateLead(req.params["id"] as string, data);
  res.status(200).json({ success: true, message: "Lead updated", data: lead });
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  await leadService.deleteLead(req.params["id"] as string);
  res.status(200).json({ success: true, message: "Lead deleted", data: null });
});

export const exportCsv = asyncHandler(async (req: Request, res: Response) => {
  const filters = leadQuerySchema.parse(req.query);
  const leads = await leadService.exportLeads(filters);

  const fields = ["name", "email", "status", "source", "createdAt"];
  const parser = new AsyncParser({ fields });
  const csv = await parser.parse(leads).promise();

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
  res.send(csv);
});
