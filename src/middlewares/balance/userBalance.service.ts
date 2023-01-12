import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";

const userBalanceService = async (userAccount: string) => {
  const balance = await AppDataSource.createQueryBuilder()
    .select(["account.money"])
    .from(Account, "account")
    .where("id = :account", { account: userAccount })
    .getOne();

  return { balance: balance.money };
};

export default userBalanceService;
