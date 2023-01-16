import { Router } from "express";
import {
  confirmUserEmailController,
  createUserController,
  deleteUserController,
  listUserController,
  sendUserConfirmEmailController,
  updateUserController,
} from "../controllers/users";
import uploadUserImageController from "../controllers/users/uploadUserImage.controller";
import {
  ensureAuthMiddleware,
  ensureAdmOwnerAuthMiddleware,
} from "../middlewares/auth";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { uploadUserImageMiddleware } from "../middlewares/users";
import ensureUserExistsMiddleware from "../middlewares/users/ensureUserExists.middleware";
import {
  createUserSchema,
  updateUserSchema,
} from "../serializers/users.serializers";

const userRoutes = Router();
userRoutes.patch(
  "/:id",
  schemaValidate(updateUserSchema),
  ensureAuthMiddleware,
  ensureAdmOwnerAuthMiddleware,
  updateUserController
);
userRoutes.post("", schemaValidate(createUserSchema), createUserController);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureAdmOwnerAuthMiddleware,
  deleteUserController
);
userRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureAdmOwnerAuthMiddleware,
  ensureUserExistsMiddleware,
  listUserController
);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
  listUserController
);
userRoutes.get(
  "/active/:id",
  ensureUserExistsMiddleware,
  confirmUserEmailController
);
userRoutes.post("/active/", sendUserConfirmEmailController);
userRoutes.post(
  "/image",
  uploadUserImageMiddleware.single("image"),
  ensureAuthMiddleware,
  uploadUserImageController
);

export default userRoutes;
