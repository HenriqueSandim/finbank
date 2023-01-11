import { Request, Response } from "express";
import { userUpdateService } from "../../services/users";

const userUpdateController = async (req: Request, res: Response) => {
  const data = await userUpdateService(req.body);

  return res.status(200).json(data);
};

export default userUpdateController;
