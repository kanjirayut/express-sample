"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenController_1 = require("../controllers/authenController");
const router = (0, express_1.Router)();
// เส้นทางสำหรับผู้ใช้
router.post("/login", authenController_1.login);
router.get("/logout", authenController_1.logout);
exports.default = router;
