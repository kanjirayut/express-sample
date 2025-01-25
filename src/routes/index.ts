import { Router } from "express";
import userRoutes from "./userRoutes";
import authenRoutes from "./authenRoutes";
import profileRoutes from "./profileRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authenRoutes);
router.use("/profile", profileRoutes);

export default router;
