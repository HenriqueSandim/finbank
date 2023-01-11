import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleError from "./errors/handleError";
import balanceRoutes from "./routes/balance.routes";
import categoriesRoutes from "./routes/categories.routes";
import financesRoutes from "./routes/finances.routes";
import loginRoutes from "./routes/login.routes";
import tranferRoutes from "./routes/transfer.routes";
import userRoutes from "./routes/users.routes";

const app = express();

app.use(express.json());
app.use("/balance", balanceRoutes);
app.use("/categories", categoriesRoutes);
app.use("/finances", financesRoutes);
app.use("/login", loginRoutes);
app.use("/transfer", tranferRoutes);
app.use("/users", userRoutes);
app.use(handleError);

export default app;
