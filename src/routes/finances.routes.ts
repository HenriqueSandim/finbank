import { Router } from "express";
import {
  createFinanceController,
  getFinancesController,
  updateFinanceController,
  deleteFinanceController,
} from "../controllers/finances";
import { ensureAuthMiddleware } from "../middlewares/auth";
import { ensureCategoryExistsMiddleware } from "../middlewares/categories";
import { ensureFinanceExistsMiddleware } from "../middlewares/finances";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { createFinanceSchema, updateFinanceSchema } from "../serializers/finances.serializers";

const financesRoutes = Router();

financesRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureFinanceExistsMiddleware,
  schemaValidate(updateFinanceSchema),
  ensureCategoryExistsMiddleware,
  updateFinanceController
);
financesRoutes.post(
  "",
  ensureAuthMiddleware,
  schemaValidate(createFinanceSchema),
  ensureCategoryExistsMiddleware,
  createFinanceController
);

financesRoutes.get("", ensureAuthMiddleware, getFinancesController);
financesRoutes.delete("/:id", ensureAuthMiddleware, ensureFinanceExistsMiddleware, deleteFinanceController);

export default financesRoutes;
