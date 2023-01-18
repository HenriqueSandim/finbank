import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import { IBalanceResponse } from "../../interfaces/balance.interfaces";


const userBalanceService = async (userAccount: number): Promise<IBalanceResponse> => {
  const accountRepository = AppDataSource.getRepository(Account)
  const balance = await accountRepository.findOneBy({id: userAccount})

  return { money: +balance.money };
};

export default userBalanceService;
