import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import Transference from "../../entities/transference.entity";

const listAllTransfersService = async (
    userAccountId: number
): Promise<Transference[]> => {
    const accountRepo = AppDataSource.getRepository(Account);

    const transferences = await accountRepo.findOne({
        where: { id: userAccountId },
        relations: { transference: true },
    });

    console.log(transferences.transference);

    return transferences.transference;
};

export default listAllTransfersService;
