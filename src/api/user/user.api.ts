import instance from "../axios";

import { AuthResponseType, SignInParamsType } from "./user.type";

export const signIn = async (params: SignInParamsType) => {
  const body = {
    // email: "john.doe@example.com",
    // password: "password123",
    ...params,
  };

  const data: AuthResponseType = await instance.post("/auth/login", body);

  return data.data.user;
};
