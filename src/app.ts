import "express-async-errors";
import express from "express";
import handleError from "./errors/handleError";

const app = express();

app.use(express.json());

app.use(handleError)

export default app;
