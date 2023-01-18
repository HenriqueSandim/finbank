import { NextFunction, Request, Response } from "express";
import fs from "fs";
import AppError from "../../errors/AppError";

const ensureImageIsValidMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const reg = /.+(\.jpg|\.png)/g;
  const isValid = reg.test(req.file.originalname);

  if (!isValid) {
    fs.unlink(req.file!.path, (error) => {
      if (error) {
        throw new AppError(String(error));
      }
    });

    throw new AppError("Invalid file format");
  }

  next();
};
export default ensureImageIsValidMiddleware;
