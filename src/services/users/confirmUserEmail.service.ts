import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";

const confirmUserEmailService = async (userId): Promise<string> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({
    id: userId,
  });

  if (user.isActive) {
    return "User already active";
  }

  await userRepo.save({
    ...user,
    isActive: true,
  });

  return "User actived";
};

export default confirmUserEmailService;
