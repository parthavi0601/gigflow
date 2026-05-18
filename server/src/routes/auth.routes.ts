import { Router } from "express";
import { register, login, getMe, verifyOtp } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.get("/me", authenticate, getMe);

export default router;
