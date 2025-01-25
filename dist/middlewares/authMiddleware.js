"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "vQ=+3ST(+w2be4E";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "Authorization header is missing" });
        return;
    }
    // สมมติว่า Token มีรูปแบบ "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Invalid Authorization header format" });
        return;
    }
    // ตัวอย่างการตรวจสอบ Token (คุณสามารถเพิ่ม JWT Validation ได้ที่นี่)
    jsonwebtoken_1.default.verify(token, SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({
                status: false,
                code: 403,
                error: { message: "Invalid token" },
            });
            return;
        }
        req.user = decoded;
    });
    next();
};
exports.authMiddleware = authMiddleware;
