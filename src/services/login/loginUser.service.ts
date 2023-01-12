import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import ILoginRequest from "../../interfaces/login.interfaces";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginUserService = async (data: ILoginRequest): Promise<string> => {
  const user = await AppDataSource.createQueryBuilder()
    .select([
      "users.id",
      "users.password",
      "users.isAdmin",
      "users.account",
      "users.isActive",
    ])
    .from(User, "users")
    .where('email = :email OR "CPF" = :cpf', {
      email: data.email,
      cpf: data.cpf,
    })
    .getOne();

  if (!user) {
    throw new AppError("Incorrect user", 403);
  }

  if (!user.isActive) {
    throw new AppError("Incorrect user", 403);
  }

  const passwordMatch = await compare(data.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Incorrect user", 403);
  }

  const token = jwt.sign(
    {
      account: user.account,
      adm: user.isAdmin,
    },
    process.env.SECRET_KEY,
    {
      subject: String(user.id),
      expiresIn: "72h",
    }
  );

  return token;
};

export default loginUserService;
