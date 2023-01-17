import AppDataSource from "../../data-source";
import Finance from "../../entities/finance.entity";

const deleteFinanceService = async (financeId: string): Promise<void> => {
  await AppDataSource.createQueryBuilder().delete().from(Finance).where("id = :id", { id: financeId }).execute();

  return;
};

export default deleteFinanceService;
