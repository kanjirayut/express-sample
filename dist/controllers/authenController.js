"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv")); // Dotenv for loading environment variables
const prisma_1 = __importDefault(require("../prisma"));
const haspassword_1 = require("../utils/haspassword");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "vQ=+3ST(+w2be4E";
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    try {
        const { email, password } = req.body;
        const validate = {};
        if (!email || email.trim() === "") {
            validate.email = "โปรดระบุ";
        }
        if (!password || password.trim() === "") {
            validate.password = "โปรดระบุ";
        }
        if (Object.keys(validate).length > 0) {
            res.status(400).json({ status: false, code: 400, error: validate });
            return;
        }
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({
                status: false,
                code: 401,
                error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
            });
            return;
        }
        const isPasswordValid = yield (0, haspassword_1.verifyPassword)(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                status: false,
                code: 401,
                error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
            });
            return;
        }
        const accessToken = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
        }, SECRET, { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
        }, SECRET, { expiresIn: "1h" });
        res.status(200).json({
            status: true,
            code: 200,
            access_token: accessToken,
            refresh_token: refreshToken,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            error: error instanceof Error
                ? error.message
                : { message: "พบบางอย่างผิดพลาด" },
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        if (isNaN(id)) {
            res.status(400).send("Invalid ID");
        }
        else {
            console.log(id);
        }
    }
    catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            error: error instanceof Error
                ? error.message
                : { message: "พบบางอย่างผิดพลาด" },
        });
    }
});
exports.logout = logout;
