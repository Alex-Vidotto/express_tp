import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Falta el header Authorization" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Falta el token" });
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);

    (req as Request & { user: any }).user = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}