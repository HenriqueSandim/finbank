import { Request, Response } from "express";
import { generatePdfService } from "../../services/pdf";

const generatePdfController = async (req: Request, res: Response) => {
  const transferId = req.params.id;
  const userAuthAccount = req.params.accountid;

  const pdf = await generatePdfService(transferId, userAuthAccount);

  return res.status(200).send(pdf);
};

export default generatePdfController;
