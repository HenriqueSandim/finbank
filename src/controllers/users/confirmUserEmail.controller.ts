import { Request, Response } from "express";
import { confirmUserEmailService } from "../../services/users";

const confirmUserEmailController = async (req: Request, res: Response) => {
  const data = await confirmUserEmailService(req.params.id);
  return res.status(200).json({
    message: data,
  });
};

export default confirmUserEmailController;
