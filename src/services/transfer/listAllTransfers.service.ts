import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import Transference from "../../entities/transference.entity";
import { ITransferResponse } from "../../interfaces/transfer.interfaces";
import { tranferResSchema } from "../../serializers/transfer.serializers";

const listAllTransfersService = async (userAccountId: number): Promise<ITransferResponse[]> => {
  const accountRepo = AppDataSource.getRepository(Account);

  const account = await accountRepo.findOne({
    where: {
      id: userAccountId,
    },
    relations: {
      transference: {
        receiverAccount: true,
        senderAccount: true,
      },
    },
  });

  const tranferencesWithoutMoney: ITransferResponse[] = await account.transference.map((transf) => {
    const validatedTransferences = tranferResSchema.validateSync(transf, {
      stripUnknown: true,
    });

    return validatedTransferences;
  });

  return tranferencesWithoutMoney;
};

export default listAllTransfersService;
