import * as yup from "yup";
import { SchemaOf } from "yup";
import validator from "cpf-cnpj-validator";
const Joi = require("@hapi/joi").extend(validator);
import { IUserRequest, IUserResponse } from "../interfaces/users.interfaces";
import { accountSchema } from "./balance.serializers";

const cpfSchema = Joi.document().cpf();

export const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().max(150).required(),
  email: yup.string().email().max(150).required(),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[A-Z]/, "Must have at least 1 uppercase letter")
    .matches(/[a-z]/, "Must have at least 1 lowercase letter")
    .matches(/[(\d)]/, "Must have at least 1 number")
    .matches(/[!@#$%*()~^]/, "Must have at least 1 special character")
    .min(8, "Must be at least 8 digits long")
    .max(16, "Must be at most 16 digits long"),
  birthdate: yup
    .string()
    .test("isValidBirthDay", "Date must be after year 1900", (date) => {
      const data = date!.split("/").map(Number);
      //mes-dia-ano
      return data[2] > 1900;
    })
    .test("isUnderAge", "Client must be 18 years or older", (date) => {
      const data = date!.split("/").map(Number);
      const birthday = new Date(data[2], data[1] - 1, data[0]);
      const today = new Date();
      const age = (today.getTime() - birthday.getTime()) / 31536000000;
      return age > 18;
    })
    .required(),
  CPF: yup.string().test("isValidCpf", "CPF number is not valid", (CPF) => {
    return !cpfSchema.validate(CPF).error;
    //return true;
  }),
});

export const returnUserSchema: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  birthdate: yup.date().required(),
  isActive: yup.boolean().required(),
  isAdmin: yup.boolean(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  account: accountSchema.required(),
});
