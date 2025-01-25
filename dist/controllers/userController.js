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
exports.daleteUserById = exports.updateUserById = exports.createUser = exports.getUsersById = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const haspassword_1 = require("../utils/haspassword");
const getUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield prisma_1.default.user.findMany();
        res.status(200).json({
            status: true,
            code: 200,
            data: userList,
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
exports.getUsers = getUsers;
const getUsersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({
            status: false,
            code: 400,
            error: "Invalid ID",
        });
    }
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id },
        });
        if (!user) {
            res.status(400).json({
                status: true,
                code: 400,
                message: "User not found",
            });
            return;
        }
        res.json({
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
});
exports.getUsersById = getUsersById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, password, email } = req.body;
        const validate = {};
        // ตรวจสอบการมีอยู่ของ username และ email ในระบบ
        const [existingEmail] = yield Promise.all([
            prisma_1.default.user.findUnique({ where: { email } }),
        ]);
        if (existingEmail) {
            validate.email = "อีเมล์นี้มีในระบบแล้ว";
        }
        //check first_name
        if (!first_name || first_name.trim() === "") {
            validate.first_name = "โปรดระบุ";
        }
        else if (!/^[a-zA-Z]+$/.test(first_name)) {
            validate.first_name = "ชื่อต้องมีเฉพาะตัวอักษรเท่านั้น";
        }
        //check last_name
        if (!last_name || last_name.trim() === "") {
            validate.last_name = "โปรดระบุ";
        }
        else if (!/^[a-zA-Z]+$/.test(last_name)) {
            validate.last_name = "นามสกุลต้องมีเฉพาะตัวอักษรเท่านั้น";
        }
        //เช็ครหัสผ่าน
        if (!password || password.trim() === "") {
            validate.password = "โปรดระบุ";
        }
        else if (password.length < 8) {
            validate.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
        }
        else if (!/^[a-zA-Z0-9_]+$/.test(password)) {
            validate.password = "รหัสผ่านต้องมีเฉพาะตัวอักษและตัวเลขเท่านั้น";
        }
        //เช็ค e-mail
        if (!email || email.trim() === "") {
            validate.email = "โปรดระบุ";
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            validate.email = "รูปแบบของอีเมลล์ไม่ถูกต้อง";
        }
        if (Object.keys(validate).length > 0) {
            res.status(422).json({ status: false, code: 422, error: validate });
            return;
        }
        const hash = yield (0, haspassword_1.hashPassword)(password);
        yield prisma_1.default.user.create({
            data: {
                first_name,
                last_name,
                password: hash,
                email,
            },
        });
        res.status(201).json({
            status: true,
            code: 201,
            data: {},
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
exports.createUser = createUser;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { first_name, last_name, password, email } = req.body;
        const validate = {};
        if (isNaN(id)) {
            res.status(400).send("Invalid ID");
        }
        // ตรวจสอบการมีอยู่ของ username และ email ในระบบ
        const [existingEmail] = yield Promise.all([
            prisma_1.default.user.findUnique({ where: { email } }),
        ]);
        if (existingEmail) {
            validate.email = "อีเมล์นี้มีในระบบแล้ว";
        }
        //check first_name
        if (!first_name || first_name.trim() === "") {
            validate.first_name = "โปรดระบุ";
        }
        else if (!/^[a-zA-Z]+$/.test(first_name)) {
            validate.first_name = "ชื่อต้องมีเฉพาะตัวอักษรเท่านั้น";
        }
        //check last_name
        if (!last_name || last_name.trim() === "") {
            validate.last_name = "โปรดระบุ";
        }
        else if (!/^[a-zA-Z]+$/.test(last_name)) {
            validate.last_name = "นามสกุลต้องมีเฉพาะตัวอักษรเท่านั้น";
        }
        //เช็ครหัสผ่าน
        if (!password || password.trim() === "") {
            validate.password = "โปรดระบุ";
        }
        else if (password.length < 8) {
            validate.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
        }
        else if (!/^[a-zA-Z0-9_]+$/.test(password)) {
            validate.password = "รหัสผ่านต้องมีเฉพาะตัวอักษและตัวเลขเท่านั้น";
        }
        //เช็ค e-mail
        if (!email || email.trim() === "") {
            validate.email = "โปรดระบุ";
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            validate.email = "รูปแบบของอีเมลล์ไม่ถูกต้อง";
        }
        if (Object.keys(validate).length > 0) {
            res.status(422).json({ status: false, code: 422, error: validate });
            return;
        }
        const hash = yield (0, haspassword_1.hashPassword)(password);
        yield prisma_1.default.user.update({
            where: { id },
            data: {
                first_name,
                last_name,
                password: hash,
                email,
            },
        });
        res.status(201).json({
            status: true,
            code: 201,
            data: {},
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
exports.updateUserById = updateUserById;
const daleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({
            status: false,
            code: 400,
            error: "Invalid ID",
        });
    }
    try {
        const user = yield prisma_1.default.user.delete({
            where: { id },
        });
        if (!user) {
            res.status(400).json({
                status: true,
                code: 400,
                message: "User not found",
            });
            return;
        }
        res.status(204).json();
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
exports.daleteUserById = daleteUserById;
