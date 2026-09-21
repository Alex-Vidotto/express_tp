import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("[Error Handler]:", err);

  const message = err.message || "Error interno del servidor";

  return res.status(500).json({ message });
};