# Nuevo proyecto: Express + TypeScript + TypeORM

---

## Paso 1 — Inicializar el proyecto

```bash
mkdir nombre-proyecto
cd nombre-proyecto
npm init -y
```

---

## Paso 2 — Instalar dependencias

```bash
npm install express typeorm mysql2 reflect-metadata dotenv bcrypt jsonwebtoken
npm install typescript tsx @types/node @types/express @types/bcrypt @types/jsonwebtoken --save-dev
```

---

## Paso 3 — Crear `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

---

## Paso 4 — Actualizar `package.json`

```json
{
  "type": "module",
  "scripts": {
    "start": "tsx --watch src/index.ts"
  }
}
```

---

## Paso 5 — Crear `.env`

```env
PORT=8080
SECRET_KEY=mi_clave_secreta

DB_HOST=localhost
DB_PORT=8889
DB_NAME=escuela_db
DB_USER=root
DB_PASS=root
```

---

## Paso 6 — Estructura de carpetas

```
src/
├── index.ts
├── database/
│   └── data-source.ts
└── modules/
    └── user/
        ├── user.entity.ts
        ├── user.repository.ts
        ├── user.service.ts
        ├── user.controller.ts
        └── user.routes.ts
```

Crear las carpetas:

```bash
mkdir -p src/database src/modules/user
```

---

## Paso 7 — DataSource (`src/database/data-source.ts`)

```typescript
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../modules/user/user.entity.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
});
```

---

## Paso 8 — Entidad (`src/modules/user/user.entity.ts`)

```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("usuarios")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  creadoEn: Date;
}
```

---

## Paso 9 — Repository (`src/modules/user/user.repository.ts`)

```typescript
import { AppDataSource } from "../../database/data-source.js";
import { User } from "./user.entity.js";

const repo = () => AppDataSource.getRepository(User);

export const findByEmail = async (email: string) =>
  repo().findOneBy({ email });

export const createUser = async (data: Partial<User>) =>
  repo().save(repo().create(data));
```

---

## Paso 10 — Service (`src/modules/user/user.service.ts`)

```typescript
import bcrypt from "bcrypt";
import * as userRepository from "./user.repository.js";

export const register = async (email: string, password: string) => {
  const existing = await userRepository.findByEmail(email);
  if (existing) throw new Error("El usuario ya existe");

  const passwordHash = await bcrypt.hash(password, 10);
  return userRepository.createUser({ email, passwordHash });
};
```

---

## Paso 11 — Controller (`src/modules/user/user.controller.ts`)

```typescript
import { Request, Response } from "express";
import * as userService from "./user.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.register(email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
```

---

## Paso 12 — Router (`src/modules/user/user.routes.ts`)

```typescript
import { Router } from "express";
import * as userController from "./user.controller.js";

const router = Router();

router.post("/register", userController.register);

export default router;
```

---

## Paso 13 — Entry point (`src/index.ts`)

```typescript
import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./database/data-source.js";
import userRoutes from "./modules/user/user.routes.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Servidor en puerto ${process.env.PORT || 8080}`);
    });
  })
  .catch((err: Error) => {
    console.error("Error al conectar:", err);
    process.exit(1);
  });
```

---

## Paso 14 — Probar

```bash
npm start
```

Resultado esperado:
```
Base de datos conectada
Servidor en puerto 8080
```

Probar el endpoint:
```bash
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@test.com", "password": "123456"}'
```
