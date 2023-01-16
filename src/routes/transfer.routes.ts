import { Router } from "express";
import { generatePdfController, requestPdfController } from "../controllers/pdf";
import { createTransferController, listAllTransfersController } from "../controllers/transfer";
import { ensureAuthMiddleware } from "../middlewares/auth";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { ensureTransferExistsMiddlware } from "../middlewares/transfer";
import { transferSchemaReq } from "../serializers/transfer.serializers";

const transferRoutes = Router();

transferRoutes.post("/:id", ensureAuthMiddleware, schemaValidate(transferSchemaReq), createTransferController);
transferRoutes.get("", ensureAuthMiddleware, listAllTransfersController);
transferRoutes.get("/pdf/:id", ensureAuthMiddleware, ensureTransferExistsMiddlware, requestPdfController);
transferRoutes.get("/pdf/generate/:id/:accountid", generatePdfController);

export default transferRoutes;
