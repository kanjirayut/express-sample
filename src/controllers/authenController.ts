import { Request, Response } from "express";
import dotenv from "dotenv"; // Dotenv for loading environment variables
import prisma from "../prisma";
import { verifyPassword } from "../utils/haspassword";
import jwt from "jsonwebtoken";
const SECRET = "vQ=+3ST(+w2be4E";
export const login = async (req: Request, res: Response): Promise<void> => {
  dotenv.config();
  try {
    const { email, password } = req.body;
    const validate: { [key: string]: string } = {};
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

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({
        status: false,
        code: 401,
        error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
      });
      return;
    }

    const isPasswordValid = await verifyPassword(password, user?.password);
    if (!isPasswordValid) {
      res.status(401).json({
        status: false,
        code: 401,
        error: { message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง" },
      });
      return;
    }

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: true,
      code: 200,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      error:
        error instanceof Error
          ? error.message
          : { message: "พบบางอย่างผิดพลาด" },
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
    } else {
      console.log(id);
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      code: 500,
      error:
        error instanceof Error
          ? error.message
          : { message: "พบบางอย่างผิดพลาด" },
    });
  }
};
