import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import Finance from "../../entities/finance.entity";
import AppError from "../../errors/AppError";
import { IFinanceUpdate } from "../../interfaces/finances.interfaces";

const updateFinanceService = async (
  data: IFinanceUpdate,
  financeId: string,
  accountId: string
) => {
  const financeRepository = AppDataSource.getRepository(Finance);

  const finance = await financeRepository
    .createQueryBuilder("finance")
    .where("finance.account = :account AND finance.id = :id", {
      account: accountId,
      id: financeId,
    })
    .getOne();

  if (!finance) {
    throw new AppError("It is not possible to change this finance", 401);
  }

  if (finance.isTransference) {
    throw new AppError("It is not possible to change this finance", 401);
  }

  const updateFinance = financeRepository.create({
    ...finance,
    ...data,
  });

  await financeRepository.save(updateFinance);

  return updateFinance;
};

export default updateFinanceService;
