import { Router } from "express";
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  exportCsv,
} from "../controllers/lead.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.get("/export/csv", requireRole("admin"), exportCsv);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/", createLead);
router.patch("/:id", updateLead);
router.delete("/:id", requireRole("admin"), deleteLead);

export default router;
