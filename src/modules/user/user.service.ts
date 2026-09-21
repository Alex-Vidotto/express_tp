import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userRepository from "./user.repository";

dotenv.config();

export const register = async (email: string, password: string) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new Error("El usuario ya existe");

  const passwordHash = await bcrypt.hash(password, 10);
  return userRepository.createUser({ email, passwordHash });
};

export const login = async (email: string, password: string) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("Credencial invalida");

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) throw new Error("Credencial invalida");

  const token = jwt.sign({ userId: user.id, email: user.email, rol: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });//jwt.sing(payload es la carga util es el primer argumento, segundo argumento es la clave secreta, tercer argumento es un objeto de opciones que contiene el tiempo de expiracion del token)

  return { token }; //user? se le podria pasar

}