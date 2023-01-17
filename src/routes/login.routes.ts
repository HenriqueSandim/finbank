import { Router } from "express";
import { loginUserController } from "../controllers/login";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { loginSchema } from "../serializers/login.serializers";

const loginRoutes = Router();

loginRoutes.post("", schemaValidate(loginSchema), loginUserController);

export default loginRoutes;
