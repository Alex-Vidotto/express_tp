import { Router } from "express";
import * as userController from "./user.controller";
import { validateBodyMiddleware } from "../../middlewares/validateBodyMiddleware";
import { authorizeRoleMiddleware } from "../../middlewares/authorizeRoleMiddleware";
import { verifyMiddleware } from "../../middlewares/verifyMiddleware";

const router = Router();

router.post("/register",validateBodyMiddleware(["email", "password"]), userController.register);
router.post("/login", validateBodyMiddleware(["email", "password"]), userController.login);
router.get("/admin",verifyMiddleware, authorizeRoleMiddleware("admin"), userController.adminRoute);

export default router;