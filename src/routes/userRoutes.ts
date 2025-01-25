import { Router } from "express";
import {
  getUsers,
  getUsersById,
  createUser,
  daleteUserById,
  updateUserById,
} from "../controllers/userController";

const router = Router();

// เส้นทางสำหรับผู้ใช้
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", daleteUserById);

export default router;
