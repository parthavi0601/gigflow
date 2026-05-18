import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { draftEmail } from "../controllers/ai.controller";

const router = Router();

router.use(authenticate); // Ensure all AI routes are protected

router.post("/draft-email/:leadId", draftEmail);

export default router;
