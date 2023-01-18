import AppDataSource from "../../data-source";
import Transference from "../../entities/transference.entity";
import { ITransferResponse } from "../../interfaces/transfer.interfaces";
import { tranferResSchema } from "../../serializers/transfer.serializers";

const listAllTransfersService = async (userAccountId: number): Promise<ITransferResponse[]> => {
  const tranferencesRepo = AppDataSource.getRepository(Transference);

  const tranferences = await tranferencesRepo
    .createQueryBuilder("transferences")
    .innerJoinAndSelect("transferences.receiverAccount", "receiver")
    .innerJoinAndSelect("transferences.senderAccount", "sender")
    .where("receiver.id = :receiverid OR sender.id = :senderid", { receiverid: userAccountId, senderid: userAccountId })
    .getMany();

  const tranferencesWithoutMoney = tranferences.map((transf) => {
    const transfWithouthMoney = tranferResSchema.validateSync(transf, {
      stripUnknown: true,
    });
    return transfWithouthMoney;
  });

  return tranferencesWithoutMoney;
};

export default listAllTransfersService;
