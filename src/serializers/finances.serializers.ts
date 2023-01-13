import * as yup from "yup";
import { SchemaOf } from "yup";
import Category from "../entities/category.entity";
import { ICategoryResponse } from "../interfaces/categories.interfaces";
import {
  IFinanceRequest,
  IFinanceResponse,
} from "../interfaces/finances.interfaces";

const categorySchema: SchemaOf<ICategoryResponse> = yup.object().shape({
  name: yup.string().required(),
  id: yup.string().required(),
});

export const createFinanceSchema: SchemaOf<IFinanceRequest> = yup
  .object()
  .shape({
    description: yup.string().max(150).required(),
    value: yup.number().required(),
    isIncome: yup.boolean().required(),
    category: yup
      .array()
      .of(categorySchema)
      .required("Array of categories is required"),
  });
