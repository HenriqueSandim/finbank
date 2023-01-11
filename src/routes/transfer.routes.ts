import { Router } from "express";
import createTransferController from "../controllers/transfer/createTransfer.controller";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { transferSchemaReq } from "../serializers/transfer.serializers";

const transferRoutes = Router();

transferRoutes.post(
    "/:id",
    schemaValidate(transferSchemaReq),
    createTransferController
);

export default transferRoutes;
