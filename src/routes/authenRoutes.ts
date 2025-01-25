import { Router } from "express";
import { login, logout } from "../controllers/authenController";

const router = Router();

// เส้นทางสำหรับผู้ใช้
router.post("/login", login);
router.get("/logout", logout);

export default router;
