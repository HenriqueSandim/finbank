import Account from "../entities/account.entity";

export interface ITransferRequest {
    description: string;
    value: number;
}

export interface ITransferResponse {
    id: string;
    description: string;
    date: Date;
    value: number;
    receiverAccountId: number,
    senderAccount: Account
}
