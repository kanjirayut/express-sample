import { Request, Response } from "express";
import prisma from "../prisma";

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.user) {
    const id = parseInt(req.user.userId);
    if (isNaN(id)) {
      res.status(400).send("Invalid ID");
    }
    try {
      const user = await prisma.user.findUnique({
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
  } else {
    res
      .status(401)
      .json({ status: false, code: 401, message: "User not authenticated" });
  }
};
