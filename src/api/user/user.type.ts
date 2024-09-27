import { APIResponseType } from "../axios.type";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
};

export type SignInParamsType = {
  email: string;
  password: string;
};

type AuthDataType = {
  success: boolean;
  user: User;
};

export type AuthResponseType = APIResponseType<AuthDataType>;
