
export interface IFinanceRequest {
    description: string
    value: number
    isIncome: boolean
    categoryId: string[]
}

export interface IFinanceResponse extends IFinanceRequest {
    accountId: string
    id: string
    isTransference: boolean
}

export interface IFinanceUpdate {
    description?: string
    value?: number
    isIncome?: boolean
}