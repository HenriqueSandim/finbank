import { IAccountResponse } from "./balance.interfaces";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  birthdate: string;
  CPF: string;
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
  birthdate: Date;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
