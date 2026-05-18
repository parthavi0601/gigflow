import { Request, Response, NextFunction } from "express";
import { generateEmailDraft } from "../services/ai.service";
import { Lead } from "../models/Lead.model";
import { ApiError } from "../utils/ApiError";

export const draftEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { leadId } = req.params;
    const lead = await Lead.findById(leadId);
    
    if (!lead) {
      throw new ApiError(404, "Lead not found");
    }

    const draft = await generateEmailDraft(lead);

    res.status(200).json({
      status: "success",
      data: draft,
    });
  } catch (error) {
    next(error);
  }
};
