import { ITransferRequest } from "../../interfaces/transfer.interfaces";

export const mockedTransfer: ITransferRequest = {
    description: "teste",
    value: 20
}

export const mockedInvalidTranfer: ITransferRequest = {
    description: "invalid transfer",
    value: 0
}

export const mockedUserTransfer = {
    senderAccount: "",
    receiverAccount: ""
}