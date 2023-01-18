import { Request, Response } from "express";
import { deleteFinanceService } from "../../services/finances";

const deleteFinanceController = async (req: Request, res: Response) => {
  const financeId: string = req.params.id;

  await deleteFinanceService(financeId, req.user.account);
  return res.status(204).json({});
};

export default deleteFinanceController;
