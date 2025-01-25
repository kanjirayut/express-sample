"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// เส้นทางสำหรับผู้ใช้
router.get("/", userController_1.getUsers);
router.get("/:id", userController_1.getUsersById);
router.post("/", userController_1.createUser);
router.put("/:id", userController_1.updateUserById);
router.delete("/:id", userController_1.daleteUserById);
exports.default = router;
