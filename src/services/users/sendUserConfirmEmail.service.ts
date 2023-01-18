import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { IActiveRequest } from "../../interfaces/users.interfaces";
import { sendEmailService } from "../email";

const sendUserConfirmEmailService = async (activeData: IActiveRequest): Promise<string> => {
  const user = await AppDataSource.getRepository(User).findOne({
    where: [{ email: activeData.email }, { cpf: activeData.cpf }],
    withDeleted: true,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isActive) {
    return "User already active";
  }

  const htmlRequest = () => {
    if (process.env.NODE_ENV === "production") {
      return `https://finbank-api.onrender.com/users/active/${user.id}`;
    } else {
      return `http://localhost:3000/users/active/${user.id}`;
    }
  };

  const sended = await sendEmailService({
    subject: "Confirmação de email",
    text: "",
    to: user.email,
    html: htmlRequest(),
  })
    .then((res) => true)
    .catch((err) => false);

  if (!sended) {
    throw new AppError("Error sending email, try again in a moment", 503);
  }
  return "Email successfully sent";
};

export default sendUserConfirmEmailService;
