import { Request, Response } from "express";
import prisma from "../prisma";
import { hashPassword } from "../utils/haspassword";

export const getUsers = async (_: Request, res: Response): Promise<void> => {
  try {
    const userList = await prisma.user.findMany();
    res.status(200).json({
      status: true,
      code: 200,
      data: userList,
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

export const getUsersById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({
      status: false,
      code: 400,
      error: "Invalid ID",
    });
  }
  try {
    const user = await prisma.user.findUnique({
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

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { first_name, last_name, password, email } = req.body;
    const validate: { [key: string]: string } = {};

    // ตรวจสอบการมีอยู่ของ username และ email ในระบบ
    const [existingEmail] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
    ]);

    if (existingEmail) {
      validate.email = "อีเมล์นี้มีในระบบแล้ว";
    }

    //check first_name
    if (!first_name || first_name.trim() === "") {
      validate.first_name = "โปรดระบุ";
    } else if (!/^[a-zA-Z]+$/.test(first_name)) {
      validate.first_name = "ชื่อต้องมีเฉพาะตัวอักษรเท่านั้น";
    }

    //check last_name
    if (!last_name || last_name.trim() === "") {
      validate.last_name = "โปรดระบุ";
    } else if (!/^[a-zA-Z]+$/.test(last_name)) {
      validate.last_name = "นามสกุลต้องมีเฉพาะตัวอักษรเท่านั้น";
    }

    //เช็ครหัสผ่าน
    if (!password || password.trim() === "") {
      validate.password = "โปรดระบุ";
    } else if (password.length < 8) {
      validate.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
    } else if (!/^[a-zA-Z0-9_]+$/.test(password)) {
      validate.password = "รหัสผ่านต้องมีเฉพาะตัวอักษและตัวเลขเท่านั้น";
    }

    //เช็ค e-mail
    if (!email || email.trim() === "") {
      validate.email = "โปรดระบุ";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      validate.email = "รูปแบบของอีเมลล์ไม่ถูกต้อง";
    }

    if (Object.keys(validate).length > 0) {
      res.status(422).json({ status: false, code: 422, error: validate });
      return;
    }

    const hash = await hashPassword(password);

    await prisma.user.create({
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

export const updateUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const { first_name, last_name, password, email } = req.body;
    const validate: { [key: string]: string } = {};

    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
    }

    // ตรวจสอบการมีอยู่ของ username และ email ในระบบ
    const [existingEmail] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
    ]);

    if (existingEmail) {
      validate.email = "อีเมล์นี้มีในระบบแล้ว";
    }

    //check first_name
    if (!first_name || first_name.trim() === "") {
      validate.first_name = "โปรดระบุ";
    } else if (!/^[a-zA-Z]+$/.test(first_name)) {
      validate.first_name = "ชื่อต้องมีเฉพาะตัวอักษรเท่านั้น";
    }

    //check last_name
    if (!last_name || last_name.trim() === "") {
      validate.last_name = "โปรดระบุ";
    } else if (!/^[a-zA-Z]+$/.test(last_name)) {
      validate.last_name = "นามสกุลต้องมีเฉพาะตัวอักษรเท่านั้น";
    }

    //เช็ครหัสผ่าน
    if (!password || password.trim() === "") {
      validate.password = "โปรดระบุ";
    } else if (password.length < 8) {
      validate.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
    } else if (!/^[a-zA-Z0-9_]+$/.test(password)) {
      validate.password = "รหัสผ่านต้องมีเฉพาะตัวอักษและตัวเลขเท่านั้น";
    }

    //เช็ค e-mail
    if (!email || email.trim() === "") {
      validate.email = "โปรดระบุ";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      validate.email = "รูปแบบของอีเมลล์ไม่ถูกต้อง";
    }

    if (Object.keys(validate).length > 0) {
      res.status(422).json({ status: false, code: 422, error: validate });
      return;
    }

    const hash = await hashPassword(password);

    await prisma.user.update({
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

export const daleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({
      status: false,
      code: 400,
      error: "Invalid ID",
    });
  }
  try {
    const user = await prisma.user.delete({
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
