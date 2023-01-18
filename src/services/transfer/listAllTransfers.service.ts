import AppDataSource from "../../data-source";
import Transference from "../../entities/transference.entity";

const listAllTransfersService = async (userAccountId: number): Promise<Transference[]> => {
  const tranferencesRepo = AppDataSource.getRepository(Transference);

  const tranferences = await tranferencesRepo
    .createQueryBuilder("transferences")
    .innerJoinAndSelect("transferences.receiverAccount", "receiver")
    .innerJoinAndSelect("transferences.senderAccount", "sender")
    .where("receiver.id = :receiverid OR sender.id = :senderid", { receiverid: userAccountId, senderid: userAccountId })
    .getMany();

  return tranferences;
};

export default listAllTransfersService;
