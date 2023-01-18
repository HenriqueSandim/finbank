import path from "path";
import ejs from "ejs";
import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import Transference from "../../entities/transference.entity";
import moment from "moment";
import Account from "../../entities/account.entity";
import { printHTML } from "./print";

const generatePdfService = async (transferId: string, userAuthAccount: string): Promise<string> => {
  const transferRepository = AppDataSource.getRepository(Transference);
  const transfer = await transferRepository.findOne({
    where: {
      id: transferId,
    },
    relations: {
      senderAccount: true,
      receiverAccount: true,
    },
  });

  const accountRepository = AppDataSource.getRepository(Account);
  const receiverAccount = await accountRepository.findOne({
    where: {
      id: transfer!.receiverAccount.id,
    },
    relations: {
      user: true,
    },
  });

  const senderAccount = await accountRepository.findOne({
    where: {
      id: +transfer!.senderAccount.id,
    },
    relations: {
      user: true,
    },
  });

  if (String(receiverAccount!.id) !== userAuthAccount && String(senderAccount!.id) !== userAuthAccount) {
    throw new AppError("Transfer not found", 404);
  }

  const date = transfer!.createdAt;
  const tratedDate = moment(date).local().format("DD/MM/YYYY HH:mm:ss");

  const receipt = {
    id: transfer!.id,
    date: tratedDate,
    receiverName: receiverAccount!.user.name,
    receiverCPF: receiverAccount!.user.cpf,
    senderName: senderAccount!.user.name,
    senderCPF: senderAccount!.user.cpf,
    value: `R$ ${transfer!.value}`,
  };

  return ejs.render(printHTML, {
    receipt,
  });
};

export default generatePdfService;
