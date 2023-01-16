import { IAccountResponse } from "./balance.interfaces";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  birthdate: string;
  cpf: string;
}

export interface IUserRequestUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  image: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  account: IAccountResponse;
}

export interface IUser {
  id: string;
  adm: boolean;
  account: number;
}

export interface IActiveRequest {
  email?: string;
  cpf?: string;
}
