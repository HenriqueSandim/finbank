import { Router } from "express";
import {
  createUserControler,
  deleteUserController,
} from "../controllers/users";
import {
  ensureAuthMiddleware,
  isAdminOrOwnerMiddleware,
} from "../middlewares/auth";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { createUserSchema } from "../serializers/users.serializers";

const userRoutes = Router();

userRoutes.post("", schemaValidate(createUserSchema), createUserControler);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  isAdminOrOwnerMiddleware,
  deleteUserController
);

export default userRoutes;
