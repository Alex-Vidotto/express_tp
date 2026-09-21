# Middleware del proyecto

## Clasificacion de middleware

### 1. Middleware global

- **`rateLimiterMiddleware`**  
  Middleware de seguridad. Limita la cantidad de peticiones para evitar abusos.

### 2. Middleware de validacion

Se encarga de comprobar que los datos enviados pr el cliente sean correctos.

- **`validateBodyMiddleware`**  
  Valida los campos recibidos en `req.body`.

Se utiliza en

- `POST /api/users/register`
- `POST /api/users/login`

### 3. Middlewre de autenticacion

Comprueba la identidad del usuario.

- **`verifyMiddleware`**  
  Verifica que la peticion contenga un token JWT valido.  
  Si el token es correcto, agrega la informacion del usuario a la peticion.

Se utiliza en:

- `GET /api/users/admin`

### 4. Middleware de autorizacion

Comprueba si el usuario autenticado tiene permisos suficientes.

- **`authorizeRoleMiddleware`**  
  Verifica que el usuario tenga el rol requerido.

En la ruta administrativa se exige el rol `admin`:

```typescript
router.get(
  "/admin",
  verifyMiddleware,
  authorizeRoleMiddleware("admin"),
  userController.adminRoute
);
```

### 5. Middleware de manejo de errores

- **`errorHandlerMiddleware`**  
  Middleware global que captura y centraliza los errores ocurridos durante el procesamiento de las peticiones.

Debe registrarse después de las rutas:

```typescript
app.use(errorHandlerMiddleware);
```

## Orden de ejecución

1. `express.json()`
2. `loggerMiddleware`
3. `rateLimiterMiddleware`
4. `validateBodyMiddleware`
5. `verifyMiddleware`, en rutas protegidas
6. `authorizeRoleMiddleware`, en rutas según el rol
7. Controlador
8. `errorHandlerMiddleware`

## Rutas de usuarios

- `POST /api/users/register`: validación del cuerpo.
- `POST /api/users/login`: validación del cuerpo.
- `GET /api/users/admin`: autenticación y autorización para el rol `admin`.
