import { Request, Response } from "express";
import { createUserService } from "../../services/users";

const createUserController = async (req: Request, res: Response) => {
  const returnedUser = await createUserService(req.body);
  return res.status(201).json(returnedUser);
};

export default createUserController;
