import { Request, Response } from "express";
import { getFinancesService } from "../../services/finances";

const getFinancesController = async (req: Request, res: Response) => {
  const returnedFinnances = await getFinancesService(req.user);
  return res.status(201).json(returnedFinnances);
};

export default getFinancesController;
