import { NextFunction, Request, Response } from "express";
import { validate } from "uuid";
import AppDataSource from "../../data-source";
import Transference from "../../entities/transference.entity";
import AppError from "../../errors/AppError";

const ensureTransferExistsMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  const transferRepository = AppDataSource.getRepository(Transference);

  const uuidValid = await validate(id);

  if (!uuidValid) {
    throw new AppError("Transfer not found", 404);
  }

  const verifyExists = await transferRepository.exist({
    where: {
      id: id,
    },
    withDeleted: true,
  });

  if (!verifyExists) {
    throw new AppError("Transfer not found", 404);
  }

  next();
};

export default ensureTransferExistsMiddlware;
