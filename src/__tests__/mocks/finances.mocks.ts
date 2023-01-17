import { IFinanceRequest, IFinanceUpdate } from "../../interfaces/finances.interfaces";

export const mockedFinance: IFinanceRequest = {
    description: "Finance test",
    value: 1000,
    isIncome: true,
    category: [{id: "a3ca34b3-9606-46bd-8f65-21a80159089c"}]
}

export const mockedFinanceUpdate: IFinanceUpdate = {
    description: "Test finance",
    value: 700,
    isIncome: false
}