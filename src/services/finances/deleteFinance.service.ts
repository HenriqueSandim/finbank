import AppDataSource from "../../data-source";
import Finance from "../../entities/finance.entity";
import AppError from "../../errors/AppError";

const deleteFinanceService = async (financeId: string, accoutId: number): Promise<void> => {
  const financeRepo = AppDataSource.getRepository(Finance);

  const financeFinded = await financeRepo.findOneBy({
    id: financeId,
    account: {
      id: accoutId,
    },
  });

  if (!financeFinded) {
    throw new AppError("finance not found", 404);
  }

  if (financeFinded.isTransference) {
    throw new AppError("this finance cannot be deleted");
  }

  await financeRepo.createQueryBuilder().delete().from(Finance).where("id = :id", { id: financeId }).execute();

  return;
};

export default deleteFinanceService;
