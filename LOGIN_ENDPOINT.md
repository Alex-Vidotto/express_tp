# Pasos para crear el endpoint de Login (JWT)

Sigue el mismo patrón usado en `register` (repository → service → controller → routes).

## 1. Configurar variables de entorno
- Agregar en el archivo `.env` una clave secreta, por ejemplo `JWT_SECRET`.
- Opcional: agregar `JWT_EXPIRES_IN` para definir el tiempo de expiración del token (ej: `1h`).

## 2. Repository (`user.repository.ts`)
- No se necesita agregar nada nuevo: ya existe `findByEmail`, que se reutilizará para buscar al usuario por su email durante el login.

## 3. Service (`user.service.ts`)
- Crear una función `login(email, password)`.
- Dentro de la función:
  1. Buscar el usuario por email usando `userRepository.findByEmail`.
  2. Si no existe, lanzar un error genérico (ej: "Credenciales inválidas"). No especificar si falló el email o la contraseña, por seguridad.
  3. Comparar la contraseña recibida con `passwordHash` usando `bcrypt.compare`.
  4. Si la comparación falla, lanzar el mismo error genérico.
  5. Si es válida, generar un token JWT con `jsonwebtoken`, firmando un payload con datos no sensibles (ej: `id` y `email` del usuario).
  6. Usar `JWT_SECRET` desde `process.env` como clave de firma y `JWT_EXPIRES_IN` como tiempo de expiración.
  7. Retornar el token (y opcionalmente algunos datos básicos del usuario, nunca el `passwordHash`).

## 4. Controller (`user.controller.ts`)
- Crear una función `login(req, res)`.
- Extraer `email` y `password` del `req.body`.
- Llamar a `userService.login(email, password)`.
- Si es exitoso, responder con status `200` y el token (ej: `{ token }`).
- Si falla, capturar el error y responder con status `401` (no autorizado) y el mensaje de error.

## 5. Routes (`user.routes.ts`)
- Agregar una nueva ruta `POST /login` que apunte a `userController.login`.

## 6. (Opcional pero recomendado) Middleware de autenticación
- Crear un middleware (ej: `auth.middleware.ts`) que:
  1. Lea el token del header `Authorization` (formato `Bearer <token>`).
  2. Verifique el token con `jsonwebtoken` usando `JWT_SECRET`.
  3. Si es válido, adjunte los datos decodificados al `req` (ej: `req.user`) y continúe con `next()`.
  4. Si no es válido o no existe, responda con status `401`.
- Este middleware se podrá usar luego para proteger rutas que requieran estar autenticado.

## 7. Probar el endpoint
- Registrar un usuario con `POST /api/users/register`.
- Hacer login con `POST /api/users/login` enviando el mismo `email` y `password`.
- Verificar que se recibe un token válido.
- Verificar que con credenciales incorrectas se recibe un `401`.
