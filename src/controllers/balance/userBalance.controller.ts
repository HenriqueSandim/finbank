import { Request, Response } from "express";
import { userBalanceService } from "../../middlewares/balance";

const userBalanceController = async (req: Request, res: Response) => {
  const accountId = req.user.account;

  const balance = await userBalanceService(accountId);

  return res.status(200).json(balance);
};

export default userBalanceController;
