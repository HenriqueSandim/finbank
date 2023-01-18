import { Request, Response } from "express";
import { createFinanceService } from "../../services/finances";

const createFinanceController = async (req: Request, res: Response) => {
  const returnedFinnance = await createFinanceService(req.body, req.user.id);
  return res.status(201).json(returnedFinnance);
};

export default createFinanceController;
