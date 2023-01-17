import { Request, Response } from "express";
import { requestPdfService } from "../../services/pdf";

const requestPdfController = async (req: Request, res: Response) => {
  const transferId = req.params.id;
  const accountid = req.user.account;

  const pdf = await requestPdfService(transferId, accountid);

  res.contentType("application/pdf");
  return res.status(200).send(pdf);
};

export default requestPdfController;
