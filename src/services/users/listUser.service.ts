import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../serializers/users.serializers";

const listUserService = async (paramId: string, userId: string): Promise<IUserResponse> => {
  let id;
  paramId ? (id = paramId) : (id = userId);

  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: {
      id: id,
    },
    relations: {
      account: true,
    },
    withDeleted: true,
  });

  const userResponse = await returnUserSchema.validate(user, {
    stripUnknown: true,
  });

  return userResponse;
};

export default listUserService;
