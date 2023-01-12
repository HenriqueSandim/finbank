import { Request, Response } from "express";
import { userBalanceService } from "../../middlewares/balance";

const userBalanceController = async (req: Request, res: Response) => {
  const userId = req.user.id;

  const balance = await userBalanceService(userId);

  return res.status(200).json(balance);
};

export default userBalanceController;
