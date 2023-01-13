import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import Finance from "../../entities/finance.entity";
import Transference from "../../entities/transference.entity";
import AppError from "../../errors/AppError";
import { ITransferRequest } from "../../interfaces/transfer.interfaces";
import { accountSchema } from "../../serializers/balance.serializers";
import { createFinanceService } from "../finances";

const createTransferService = async (
  dataTransfer: ITransferRequest,
  senderAccountId: number,
  receivedAccountId: number
): Promise<Transference> => {
  const transferRepo = AppDataSource.getRepository(Transference);
  const accountRepo = AppDataSource.getRepository(Account);

  const receiverAccount = await accountRepo.findOne({
    where: {
      id: receivedAccountId,
    },
    relations: {
      user: true,
    },
  });

  if (!receiverAccount) {
    throw new AppError("account not found", 404);
  }

  const senderAccount = await accountRepo.findOne({
    where: {
      id: senderAccountId,
    },
    relations: {
      user: true,
    },
  });

  if (+senderAccount.money < dataTransfer.value) {
    throw new AppError("insufficient money", 401);
  }
  //   const dateTest = new Date().valueOf();
  //   console.log(dateTest);
  await accountRepo.save([receiverAccount, senderAccount]);

  if (dataTransfer.date) {
    const newDate = new Date(dataTransfer.date);
    dataTransfer.date = newDate.toISOString().split("T")[0];
  }

  const FinanceData = {
    description: "Tranference",
    value: dataTransfer.value,
    category: [{ name: "Salário" }],
  };
  //Repositório de finanças
  await createFinanceService({ ...FinanceData, isIncome: false }, senderAccount.user.id);
  await createFinanceService({ ...FinanceData, isIncome: true }, receiverAccount.user.id);
  // const { user, ...rest } = senderAccount;
  const senderAccountResponse = await accountSchema.validate(senderAccount, {
    stripUnknown: true,
  });

  const newTransfer = transferRepo.create({
    ...dataTransfer,
    receiverAccount: receiverAccount.id,
    senderAccount: senderAccountResponse,
  });
  await transferRepo.save(newTransfer);

  return newTransfer;
};

export default createTransferService;
