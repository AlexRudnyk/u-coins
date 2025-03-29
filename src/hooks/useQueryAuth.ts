import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/authApi";
import { RegisterBody } from "@/types/auth";

const authKeys = {
  register: ["register"],
  login: ["login"],
  logout: ["logout"],
};

const useMutateRegister = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (registerBody: RegisterBody) => authApi.register(registerBody),
    // onSuccess: () => queryClient.invalidateQueries({}),
  });
};

// const useQueryFilteredCoins = (
//   fromPrice?: string,
//   toPrice?: string,
//   q?: string
// ) =>
//   useQuery({
//     queryKey: coinsKeys.filtered(fromPrice || "", toPrice || "", q || ""),
//     queryFn: () => coinsApi.getCoins(fromPrice, toPrice, q),
//   });

export { useMutateRegister, authKeys };
