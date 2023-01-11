export interface iTransferRequest {
    description: string;
    value: number;
}

export interface iTransferResponse {
    id: string;
    description: string;
    date: Date;
    value: number;
    senderId: string;
    receivedId: string;
}
