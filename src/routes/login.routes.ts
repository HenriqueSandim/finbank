import { Router } from "express";
import { loginUserController } from "../controllers/login";

const loginRoutes = Router();

loginRoutes.post("", loginUserController);

export default loginRoutes;
