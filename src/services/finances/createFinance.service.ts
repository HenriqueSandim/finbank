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

const createFinanceService = async (
  body: IFinanceRequest,
  userId: string
): Promise<IFinanceResponse> => {
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

  //Alterar o valor da conta
  let newValue = 0;
  if (body.isIncome) {
    newValue = Number(accountFound.money) + body.value;
  } else {
    newValue = Number(accountFound.money) - body.value;
  }

  await accountRepo.save({
    id: accountFound.id,
    money: newValue,
  });

  //Repositório de finanças
  const financeRepo = AppDataSource.getRepository(Finance);
  const newFinance = financeRepo.create({
    value: body.value,
    description: body.description,
    isIncome: body.isIncome,
    account: accountFound,
  });
  await financeRepo.save(newFinance);
  //Repositório de finanças_categorias

  const finCatRepo = AppDataSource.getRepository(Finances_categories);

  let newFinCat = {};
  const finCats: any = body.category.map((cat) => {
    newFinCat = finCatRepo.create({
      finance: newFinance,
      category: cat,
    });
    return newFinCat;
  });
  await finCatRepo.save(finCats);

  const financeReturn = await financeRepo.findOne({
    where: { id: newFinance.id },
    relations: { financesCategory: true },
  });

  const { financesCategory, ...rest } = financeReturn as any;

  const categoriesList = financeReturn.financesCategory.map((fin) => {
    return fin.category;
  });

  return { ...rest, categoriesList };
};

export default createFinanceService;
