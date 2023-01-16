import { DeleteResult } from "typeorm";
import AppDataSource from "../../data-source";
import Finance from "../../entities/finance.entity";
import AppError from "../../errors/AppError";

const deleteFinanceService = async (
    financeId: string
): Promise<DeleteResult> => {
    return await AppDataSource.createQueryBuilder()
        .delete()
        .from(Finance)
        .where("id = :id", { id: financeId })
        .execute();
};

export default deleteFinanceService;
