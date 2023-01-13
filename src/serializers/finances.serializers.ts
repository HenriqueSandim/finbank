import * as yup from "yup";
import { SchemaOf } from "yup";
import { IFinanceUpdate } from "../interfaces/finances.interfaces";

export const updateFinanceSerializer: SchemaOf<IFinanceUpdate> = yup
  .object()
  .shape({
    description: yup.string(),
    value: yup.number(),
    isIncome: yup.boolean(),
  });
