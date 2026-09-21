import { NextFunction, Request, Response } from "express";

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  
  next();
};