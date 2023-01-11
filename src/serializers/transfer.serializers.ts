import * as yup from "yup";

export const transferSchemaReq = yup.object().shape({
    description: yup.string().notRequired(),
    value: yup.number().notRequired(),
});
