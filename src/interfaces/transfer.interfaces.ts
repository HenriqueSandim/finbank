import Account from "../entities/account.entity"

export interface ITransferRequest {
    description: string
    value: number
    senderAccount: string
    receiverAccount: string
}
export interface ITransferResponse {
    id: string
    description: string
    date: Date
    value: number
    account: Account
}