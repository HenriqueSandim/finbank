import { Router } from "express";
import { updateFinanceController } from "../controllers/finances";
import { ensureAuthMiddleware } from "../middlewares/auth";
import { ensureFinanceExistsMiddleware } from "../middlewares/finances";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { updateFinanceSerializer } from "../serializers/finances.serializers";

const financesRoutes = Router();

financesRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureFinanceExistsMiddleware,
  schemaValidate(updateFinanceSerializer),
  updateFinanceController
);

export default financesRoutes;
