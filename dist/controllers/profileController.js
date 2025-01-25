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
exports.getProfile = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const id = parseInt(req.user.userId);
        if (isNaN(id)) {
            res.status(400).send("Invalid ID");
        }
        try {
            const user = yield prisma_1.default.user.findUnique({
                where: { id },
            });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json({
                status: true,
                code: 200,
                data: user,
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
    }
    else {
        res
            .status(401)
            .json({ status: false, code: 401, message: "User not authenticated" });
    }
});
exports.getProfile = getProfile;
