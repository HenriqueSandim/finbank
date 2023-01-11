import AppDataSource from "../../data-source";
import Transference from "../../entities/transference.entity";
import User from "../../entities/user.entity";
import { iTransferRequest } from "../../interfaces/transfer.interfaces";

const createTransferService = async (
    DataTransfer: iTransferRequest,
    // userId: string,
    receivedId: string
) => {
    const transferRepo = AppDataSource.getRepository(Transference);
    const usersRepo = AppDataSource.getRepository(User);

    // const newTransfer = transferRepo.save({
    //     ...DataTransfer,
    //     date: new Date() + "",
    //     receivedId: receivedId,
    //     senderId: "asd192ii9oik9i",
    // });

    console.log({
        ...DataTransfer,
        date: new Date() + "",
        receivedId: receivedId,
        senderId: "asd192ii9oik9i",
    });

    return {...DataTransfer, date: new Date() + '',  receivedId: receivedId, senderId: 'asd192ii9oik9i'}
};

export default createTransferService;
