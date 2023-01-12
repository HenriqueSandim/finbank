import { Router } from "express";
import userUpdateController from "../controllers/users/userUpdate.controller";
import { createUserControler } from "../controllers/users/createUser.controller";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { createUserSchema } from "../serializers/users.serializers";

const userRoutes = Router();
userRoutes.patch("/:id", userUpdateController);
userRoutes.post("", schemaValidate(createUserSchema), createUserControler);

export default userRoutes;
