import { useQuery } from "@tanstack/react-query";

import { coinsApi } from "@/api/coinsApi";

const coinsKeys = {
  all: (fromPrice?: string, toPrice?: string, q?: string) => [
    "coins",
    fromPrice,
    toPrice,
    q,
  ],
  //   getOne: (id: string) => [...productsKeys.all, id],
};

const useQueryCoins = (fromPrice?: string, toPrice?: string, q?: string) =>
  useQuery({
    queryKey: coinsKeys.all(fromPrice, toPrice, q),
    queryFn: () => coinsApi.getCoins(fromPrice, toPrice, q),
  });

export { useQueryCoins, coinsKeys };
