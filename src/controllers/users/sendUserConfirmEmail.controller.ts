import { Request, Response } from "express";
import { IActiveRequest } from "../../interfaces/users.interfaces";
import sendUserConfirmEmailService from "../../services/users/sendUserConfirmEmail.service";

const sendUserConfirmEmailController = async (req: Request, res: Response) => {
  const activeData: IActiveRequest = req.body;
  const data = await sendUserConfirmEmailService(activeData);

  return res.status(201).json(data);
};
export default sendUserConfirmEmailController;
