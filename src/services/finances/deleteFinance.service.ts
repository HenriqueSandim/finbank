import AppDataSource from "../../data-source";
import Finance from "../../entities/finance.entity";

const deleteFinanceService = async (financeId: string) => {
    return await AppDataSource.createQueryBuilder()
        .delete()
        .from(Finance)
        .where("id = :id", { id: financeId })
        .execute();
};

export default deleteFinanceService;
