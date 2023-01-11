import { Request, Response } from "express";
import { userUpdateService } from "../../services/users";

const userUpdateController = async (req: Request, res: Response) => {
  const updateData = req.body;
  const data = await userUpdateService(updateData, req.params.id);

  return res.status(200).json(data);
};

export default userUpdateController;
