import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { IUserRequestUpdate, IUserResponse } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../serializers/users.serializers";

const updateUserService = async (payload: IUserRequestUpdate, userId: string) => {
  const keys = Object.keys(payload);

  if (!keys.length) {
    throw new AppError("No filed allowed to be updated sent");
  }

  const userRepo = AppDataSource.getRepository(User);

  const updateHashedPass = async () => {
    const hashedPass = await hash(payload.password, 10);
    await userRepo.update(userId, { ...payload, password: hashedPass });
  };

  payload.password ? await updateHashedPass() : await userRepo.update(userId, { ...payload });

  const user = await userRepo.findOne({
    where: { id: userId },
    relations: { account: true },
  });

  const updatedUserResponse: IUserResponse = await returnUserSchema.validate(user, {
    stripUnknown: true,
  });

  return updatedUserResponse;
};

export default updateUserService;
