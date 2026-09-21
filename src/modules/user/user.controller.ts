import { Request, Response } from "express";
import * as userService from "./user.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.register(email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password, rol } = req.body;
  try {
    const user = await userService.login(email, password);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const adminRoute = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Acceso permitido: eres administrador",
  });
};