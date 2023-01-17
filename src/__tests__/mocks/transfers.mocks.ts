import { ITransferRequest } from "../../interfaces/transfer.interfaces";

export const mockedTransfer: ITransferRequest = {
    description: "teste",
    value: 20,
    date: "2023/03/10",
}

export const mockedInvalidTranfer: ITransferRequest = {
    description: "invalid transfer",
    value: 0
}

export const mockedInvalidDate: ITransferRequest = {
    description: "invalid transfer",
    value: 20,
    date: "12/03/2024",
}

export const mockedBeforeDate: ITransferRequest = {
    description: "invalid transfer",
    value: 20,
    date: "2021/03/10",
}

export const mockedUserTransfer = {
    senderAccount: "",
    receiverAccount: ""
}