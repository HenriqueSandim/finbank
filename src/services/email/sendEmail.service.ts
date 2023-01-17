import { createTransport } from "nodemailer";
import AppError from "../../errors/AppError";
import { IEmailRequest } from "../../interfaces/email.interfaces";

const sendEmailService = async ({ subject, text, to, file, html }: IEmailRequest): Promise<void> => {
  const mailContent = () => {
    if (file) {
      return {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        html: text,
        attachments: [
          {
            filename: "Transfer_voucher.pdf",
            content: file,
          },
        ],
      };
    }
    if (html) {
      return {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        text: html,
      };
    } else {
      return {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        html: text,
      };
    }
  };

  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter
    .sendMail(mailContent())
    .then(() => {
      console.log("Email send with success");
    })
    .catch((err) => {
      console.log(err);
      throw new AppError("Error sending email, try again later");
    });
};

export default sendEmailService;
