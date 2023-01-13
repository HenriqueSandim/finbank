import { Router } from "express";
import { createFinanceController } from "../controllers/finances";
import getFinancesController from "../controllers/finances/getFinances.controller";
import { ensureAuthMiddleware } from "../middlewares/auth";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { createFinanceSchema } from "../serializers/finances.serializers";

const financesRoutes = Router();

financesRoutes.post(
  "",
  ensureAuthMiddleware,
  schemaValidate(createFinanceSchema),
  createFinanceController
);

financesRoutes.get("", ensureAuthMiddleware, getFinancesController);

export default financesRoutes;
