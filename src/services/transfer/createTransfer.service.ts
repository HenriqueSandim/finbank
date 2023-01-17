import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import Transference from "../../entities/transference.entity";
import AppError from "../../errors/AppError";
import { ITransferFinance, ITransferRequest, ITransferResponse } from "../../interfaces/transfer.interfaces";
import { accountSchema } from "../../serializers/balance.serializers";
import { tranferResSchema } from "../../serializers/transfer.serializers";
import { sendEmailService } from "../email";
import { createFinanceService } from "../finances";
import { requestPdfService } from "../pdf";

const createTransferService = async (
  dataTransfer: ITransferRequest,
  senderAccountId: number,
  receivedAccountId: number
): Promise<ITransferResponse> => {
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

  await accountRepo.save([receiverAccount, senderAccount]);

  const financeData: ITransferFinance = {
    description: `Tranferência para ${receiverAccount.user.name}`,
    value: dataTransfer.value,
    category: [{ name: "Transferência" }],
    isTransference: true,
  };

  await createFinanceService({ ...financeData, isIncome: false }, senderAccount.user.id);
  await createFinanceService({ ...financeData, isIncome: true }, receiverAccount.user.id);

  const senderAccountResponse = await accountSchema.validate(senderAccount, {
    stripUnknown: true,
  });
  const receiverAccountResponse = await accountSchema.validate(receiverAccount, {
    stripUnknown: true,
  });

  const newTransfer = transferRepo.create({
    ...dataTransfer,
    receiverAccount: receiverAccountResponse,
    senderAccount: senderAccountResponse,
  });
  await transferRepo.save(newTransfer);

 

  if(process.env.NODE_ENV === "test"){
    null
  } else {
    const pdf = await requestPdfService(newTransfer.id, senderAccountId);
    await sendEmailService({
      subject: "Comprovante de Transferência",
      text: "",
      to: senderAccount.user.email,
      file: pdf,
    });
    await sendEmailService({
      subject: "Comprovante de Transferência",
      text: "",
      to: receiverAccount.user.email,
      file: pdf,
    });

  }


  const transferWithoutMoney = tranferResSchema.validateSync(newTransfer, {
    stripUnknown: true,
  });

  return transferWithoutMoney;
};

export default createTransferService;
