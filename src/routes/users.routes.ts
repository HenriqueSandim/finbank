import { Router } from "express";
import { createUserController, deleteUserController } from "../controllers/users";
import { ensureAuthMiddleware, ensureAdmOwnerAuthMiddleware } from "../middlewares/auth";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { createUserSchema } from "../serializers/users.serializers";

const userRoutes = Router();

userRoutes.post("", schemaValidate(createUserSchema), createUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, ensureAdmOwnerAuthMiddleware, deleteUserController);

export default userRoutes;
