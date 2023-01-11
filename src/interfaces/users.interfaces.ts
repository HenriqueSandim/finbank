export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  birthdate: string;
  CPF: string;
}

export interface IUserReturn {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  account: IAccount;
}

interface IAccount {
  id: number;
  money: string;
}
