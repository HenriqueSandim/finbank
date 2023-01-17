import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import Finance from "../../entities/finance.entity";
import Finances_categories from "../../entities/finance_category.entity";
import AppError from "../../errors/AppError";
import { IFinanceUpdate, IFinanceUpdateResponse } from "../../interfaces/finances.interfaces";
import { updateFinanceRespSchema } from "../../serializers/finances.serializers";

const updateFinanceService = async (
  data: IFinanceUpdate,
  financeId: string,
  accountId: number,
  error: string
): Promise<IFinanceUpdateResponse> => {
  const financeRepository = AppDataSource.getRepository(Finance);

  const finance = await financeRepository.findOne({
    where: {
      account: {
        id: accountId,
      },
      id: financeId,
    },
    relations: {
      account: true,
      financesCategory: {
        category: true,
      },
    },
  });

  if (!finance) {
    throw new AppError("It is not possible to change this finance", 401);
  }

  const finCatRepo = AppDataSource.getRepository(Finances_categories);

  const financeCategoriesList = async (categories): Promise<Finances_categories[]> => {
    let finCat;
    if (categories) {
      const categoriesRepo = AppDataSource.getRepository(Category);
      const categoriesName = categories.map((cat) => cat.name);
      const categoriesId = categories.map((cat) => cat.id);

      const findedCategories = await categoriesRepo
        .createQueryBuilder("category")
        .where("category.name IN (:...name) OR category.id IN (:...id)", { name: categoriesName, id: categoriesId })
        .getMany();

      finCat = findedCategories.map((cat) => {
        const newFinCat = finCatRepo.create({
          finance: finance,
          category: cat,
        });
        return newFinCat;
      });
    } else {
      finCat = finance.financesCategory.map((cat) => {
        const newFinCat = finCatRepo.create({
          category: cat.category,
          finance: finance,
        });

        return newFinCat;
      });
    }

    return finCat;
  };

  const finCat = await financeCategoriesList(data.category);

  await finCatRepo.save(finCat);

  const updateFinance = financeRepository.create({
    ...finance,
    ...data,
    financesCategory: finCat,
  });

  await financeRepository.save(updateFinance);

  const updateFinanceResponse = updateFinanceRespSchema.validateSync(updateFinance, {
    stripUnknown: true,
  });

  if (error) {
    updateFinanceResponse.error.message = error;
  } else {
    const { error, ...rest } = updateFinanceResponse;
    return { ...rest };
  }

  return updateFinanceResponse;
};

export default updateFinanceService;
