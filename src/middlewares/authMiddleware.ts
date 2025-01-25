import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const SECRET = "vQ=+3ST(+w2be4E";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
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

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({
        status: false,
        code: 403,
        error: { message: "Invalid token" },
      });
      return;
    }
    (req as any).user = decoded;
  });
  next();
};
