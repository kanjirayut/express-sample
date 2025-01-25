"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
// เส้นทางสำหรับผู้ใช้
router.get("/", middlewares_1.authMiddleware, profileController_1.getProfile);
exports.default = router;
