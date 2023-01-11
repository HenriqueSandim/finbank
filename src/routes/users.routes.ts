import { Router } from "express";
import userUpdateController from "../controllers/users/userUpdate.controller";

const userRoutes = Router();
userRoutes.patch("/:id", userUpdateController);
export default userRoutes;
