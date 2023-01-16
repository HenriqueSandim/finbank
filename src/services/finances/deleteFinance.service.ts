import { DeleteResult } from "typeorm";
import AppDataSource from "../../data-source";
import Finance from "../../entities/finance.entity";
import AppError from "../../errors/AppError";

const deleteFinanceService = async (
    financeId: string
): Promise<DeleteResult> => {
    const finance = await AppDataSource.createQueryBuilder()
        .select("finance")
        .from(Finance, "finance")
        .where("finance.id = :id", { id: financeId })
        .getOne();

    if (!finance) {
        throw new AppError("Finance not found", 404);
    }

    return await AppDataSource.createQueryBuilder()
        .delete()
        .from(Finance)
        .where("id = :id", { id: financeId })
        .execute();
};

export default deleteFinanceService;
