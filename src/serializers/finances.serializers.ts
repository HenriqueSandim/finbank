import * as yup from "yup";
import { SchemaOf } from "yup";
import Category from "../entities/category.entity";
import { ICategoryResponse } from "../interfaces/categories.interfaces";
import { IFinanceRequest, IFinanceResponse } from "../interfaces/finances.interfaces";

const categorySchema: SchemaOf<ICategoryResponse> = yup.object().shape({
  name: yup.string(),
  id: yup.string(),
});
const validCategorySchema = categorySchema.test("one-required", "category name or id is required", (value) => {
  return !!(value.name || value.id);
});

export const createFinanceSchema: SchemaOf<IFinanceRequest> = yup.object().shape({
  description: yup.string().max(150).required(),
  value: yup.number().required(),
  isIncome: yup.boolean().required(),
  category: yup.array().of(validCategorySchema).required(),
});
