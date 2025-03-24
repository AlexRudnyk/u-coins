import { useQuery } from "@tanstack/react-query";

import { coinsApi } from "@/api/coinsApi";

const coinsKeys = {
  all: (fromPrice?: string, toPrice?: string) => ["coins", fromPrice, toPrice],
  //   getOne: (id: string) => [...productsKeys.all, id],
};

const useQueryCoins = (fromPrice?: string, toPrice?: string) =>
  useQuery({
    queryKey: coinsKeys.all(fromPrice, toPrice),
    queryFn: () => coinsApi.getCoins(fromPrice, toPrice),
  });

export { useQueryCoins, coinsKeys };
