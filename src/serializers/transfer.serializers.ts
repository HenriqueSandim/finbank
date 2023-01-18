import * as yup from "yup";
import { SchemaOf } from "yup";
import { ITransferRequest, ITransferResponse } from "../interfaces/transfer.interfaces";

export const transferReqSchema: SchemaOf<ITransferRequest> = yup.object().shape({
  description: yup.string().required(),
  value: yup.number().required(),
  date: yup
    .string()
    .transform((date) => date.replace(/[-]/g, "/"))
    .test("Date is Valid", "Date format is invalid, format is yyyy/mm/dd", (date) => {
      if (date) {
        const insertDate = new Date(date);
        return !`${insertDate}`.toLowerCase().includes("invalid") && date.split("/")[0].length == 4;
      }
      return true;
    })
    .test("isValidTransferDate", "Date must be today or after", (date) => {
      if (date) {
        const todayData = new Date().toISOString().split("T")[0];
        const today = new Date(todayData);
        const tranferDate = new Date(date);
        const dateTimeDifference = today.getTime() - tranferDate.getTime();
        return dateTimeDifference <= 0;
      }
      return true;
    })
    .notRequired(),
});

export const tranferResSchema: SchemaOf<ITransferResponse> = yup.object().shape({
  id: yup.string(),
  description: yup.string(),
  date: yup.date(),
  value: yup.number(),
  createdAt: yup.date(),
  receiverAccount: yup.object().shape({
    id: yup.number(),
  }),
  senderAccount: yup.object().shape({
    id: yup.number(),
  }),
});
