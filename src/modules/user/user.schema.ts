import * as yup from "yup";

export const registerSchema = yup.object({
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  email: yup
    .string()
    .email("El email no es valido")
    .required("El email es obligatorio"),

  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("El email no es valido")
    .required("El email es obligatorio"),

  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const roleSchema = yup
  .mixed<"admin" | "user">()
  .oneOf(["admin", "user"], "El rol no es válido")
  .default("user");

export type RegisterInput = yup.InferType<typeof registerSchema>;
export type LoginInput = yup.InferType<typeof loginSchema>;