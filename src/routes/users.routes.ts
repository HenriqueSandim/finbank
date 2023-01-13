import { Router } from "express";
import { createUserControler } from "../controllers/users/createUser.controller";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { createUserSchema } from "../serializers/users.serializers";

const userRoutes = Router();

userRoutes.post("", schemaValidate(createUserSchema), createUserControler);

export default userRoutes;
