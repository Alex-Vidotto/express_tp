import { NextFunction, Request, Response } from "express";

const contadorRequest = new Map<string, { count: number; startTime: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_PETICIONES = 5; 

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown_ip";
  const currentTime = Date.now();
  const record = contadorRequest.get(ip);

  if (!record) {
    contadorRequest.set(ip, { count: 1, startTime: currentTime });
    return next();
  }

  if (currentTime - record.startTime > WINDOW_MS) {
    contadorRequest.set(ip, { count: 1, startTime: currentTime });
    return next();
  }

  if (record.count >= MAX_PETICIONES) {
    return res.status(429).json({ message: "Demasiadas peticiones. Intente mas tarde." });
  }

  record.count += 1;
  next();
};