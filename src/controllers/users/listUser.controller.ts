import { Request, Response } from "express";
import { listUserService } from "../../services/users";

const listUserController = async (req: Request, res: Response) => {
  const data = await listUserService(req.params.id, req.user.id);

  return res.status(200).json(data);
};

export default listUserController;
