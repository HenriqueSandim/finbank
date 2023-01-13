import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import Finance from "../../entities/finance.entity";
import Finances_categories from "../../entities/finance_category.entity";
import User from "../../entities/user.entity";
import {
  IFinanceRequest,
  IFinanceResponse,
} from "../../interfaces/finances.interfaces";
import { IUser } from "../../interfaces/users.interfaces";

const getFinancesService = async (userId: string): Promise<any> => {
  //Repositório do Usuário
  const userRepo = AppDataSource.getRepository(User);
  const foundUser = await userRepo.findOne({
    where: { id: userId },
    relations: { account: true },
  });
  //Repositório de Contas
  const accountRepo = AppDataSource.getRepository(Account);
  const accountFound = await accountRepo.findOne({
    where: { id: foundUser.account.id },
  });

  //Repositório de finanças
  const financeRepo = AppDataSource.getRepository(Finance);
  const financeList = await financeRepo.find({
    relations: { account: true },
  });

  //Falta conseguir filtrar pelos métodos do typeorm apenas as finanças do usuário logado

  return financeList;
};

export default getFinancesService;
