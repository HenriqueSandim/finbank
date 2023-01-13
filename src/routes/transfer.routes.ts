import { Router } from "express";
import { createTransferController } from "../controllers/transfer";
import { ensureAuthMiddleware } from "../middlewares/auth";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { transferSchemaReq } from "../serializers/transfer.serializers";

const transferRoutes = Router();

transferRoutes.post("/:id", ensureAuthMiddleware, schemaValidate(transferSchemaReq), createTransferController);

export default transferRoutes;
