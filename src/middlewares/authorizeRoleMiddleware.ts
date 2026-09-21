import { NextFunction, Request, Response } from "express";

export const authorizeRoleMiddleware = (allowedRole: string) => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    if (user.rol !== allowedRole) {
      return res.status(403).json({ message: "Acceso denegado: rol insuficiente" });
    }

    next();
  };
};