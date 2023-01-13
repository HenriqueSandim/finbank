import Account from "../entities/account.entity";
import Category from "../entities/category.entity";
import { ICategoryResponse } from "./categories.interfaces";

export interface IFinanceRequest {
  description: string;
  value: number;
  isIncome: boolean;
  category: ICategoryResponse[];
}

export interface IFinanceResponse {
  id: string;
  description: string;
  value: string;
  isIncome: boolean;
  isTransference: boolean;
  createdAt: string;
  categoriesList: ICategoryResponse[];
}

export interface IFinanceUpdate {
  description?: string;
  value?: number;
  isIncome?: boolean;
}
