import { Request, Response } from "express";
import { iTransferRequest } from "../../interfaces/transfer.interfaces";
import createTransferService from "../../services/transfer/createTransfer.service";

const createTransferController = async (req: Request, res: Response) => {
    const dataTransfer: iTransferRequest = req.body;
    // const userId: string = req.user.uuid;
    const receivedId: string = req.params.id;
    const data = await createTransferService(dataTransfer, receivedId);
    return res.status(201).json(data);
};

export default createTransferController;
