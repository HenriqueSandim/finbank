import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";

<<<<<<< Updated upstream:src/middlewares/balance/userBalance.service.ts
const userBalanceService = async (userAccount: string) => {
  const balance = await AppDataSource.createQueryBuilder()
    .select(["account.money"])
    .from(Account, "account")
    .where("id = :account", { account: userAccount })
    .getOne();
=======
const userBalanceService = async (userAccount: number): Promise<IBalanceResponse> => {
  const accountRepository = AppDataSource.getRepository(Account)
  const balance = await accountRepository.findOneBy({id: userAccount})
>>>>>>> Stashed changes:src/services/balance/userBalance.service.ts

  return { balance: balance.money };
};

export default userBalanceService;
