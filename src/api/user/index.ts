import { DefaultError, useMutation } from "@tanstack/react-query";

import { signIn, signUp } from "./user.api";
import { SignInParamsType, User } from "./user.type";

import { MUTATION_KEYS } from "@/enum/api";

export const useSignIn = () => {
  const result = useMutation<User, DefaultError, SignInParamsType>({
    mutationKey: [MUTATION_KEYS.SIGN_IN],
    mutationFn: signIn,
  });

  return {
    ...result,
  };
};

export const useSignUp = () => {
  const result = useMutation<User, DefaultError, SignInParamsType>({
    mutationKey: [MUTATION_KEYS.SIGN_UP],
    mutationFn: signUp,
  });

  return {
    ...result,
  };
};
