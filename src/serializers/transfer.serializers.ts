import * as yup from "yup";

export const transferSchemaReq = yup.object().shape({
  description: yup.string().required(),
  value: yup.number().required(),
  date: yup.string().notRequired(),
});
