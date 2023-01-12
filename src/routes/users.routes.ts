import { Router } from "express";
import { createUserController, deleteUserController, updateUserController } from "../controllers/users";
import { ensureAuthMiddleware, ensureAdmOwnerAuthMiddleware } from "../middlewares/auth";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { createUserSchema, updateUserSchema } from "../serializers/users.serializers";

const userRoutes = Router();
userRoutes.patch(
  "/:id",
  schemaValidate(updateUserSchema),
  ensureAuthMiddleware,
  ensureAdmOwnerAuthMiddleware,
  updateUserController
);
userRoutes.post("", schemaValidate(createUserSchema), createUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, ensureAdmOwnerAuthMiddleware, deleteUserController);

export default userRoutes;
