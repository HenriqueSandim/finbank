import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import Finance from "../../entities/finance.entity";
import AppError from "../../errors/AppError";

const ensureFinanceIsTranferenceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const financeRepo = AppDataSource.getRepository(Finance);

  const financeFinded = await financeRepo.findOneBy({
    id: id,
  });

  if (financeFinded.isTransference) {
    throw new AppError("cannot change or remove this finance", 403);
  }

  return next();
};

export default ensureFinanceIsTranferenceMiddleware;
