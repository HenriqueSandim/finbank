import { IFinanceRequest, IFinanceUpdate } from "../../interfaces/finances.interfaces";

export const mockedFinance: IFinanceRequest = {
    description: "Finance test",
    value: 1000,
    isIncome: true,
    category: [{name: "Salario"}]
}

export const mockedFinanceUpdate: IFinanceUpdate = {
    description: "Test finance",
    value: 700,
    isIncome: false
}