import { Router } from "express";
import { getProfile } from "../controllers/profileController";
import { authMiddleware } from "../middlewares";

const router = Router();

// เส้นทางสำหรับผู้ใช้
router.get("/", authMiddleware, getProfile);

export default router;
