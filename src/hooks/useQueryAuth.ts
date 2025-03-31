import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/api/authApi";
import { LoginBody, RegisterBody } from "@/types/auth";

const useMutateRegister = () => {
  return useMutation({
    mutationFn: (registerBody: RegisterBody) => authApi.register(registerBody),
  });
};

const useMutateLogin = () => {
  return useMutation({
    mutationFn: (loginBody: LoginBody) => authApi.login(loginBody),
  });
};

const useMutateLogout = () => {
  return useMutation({
    mutationFn: () => authApi.logout(),
  });
};

export { useMutateRegister, useMutateLogin, useMutateLogout };
