import { createTransport } from "nodemailer";
import { IEmailRequest } from "../../interfaces/email.interfaces";

const sendEmail = async ({ subject, text, to, file }: IEmailRequest): Promise<void> => {
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
    .sendMail({
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
    })
    .then(() => {
      console.log("Email send with success");
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error sending email, try again later");
    });
};

export default sendEmail;
