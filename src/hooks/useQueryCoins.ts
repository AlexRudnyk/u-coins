import { useQuery } from "@tanstack/react-query";

import { coinsApi } from "@/api/coinsApi";

const coinsKeys = {
  all: ["coins"],
  //   getOne: (id: string) => [...productsKeys.all, id],
};

const useQueryCoins = (fromPrice?: string, toPrice?: string) =>
  useQuery({
    queryKey: ["coins", fromPrice, toPrice],
    queryFn: () => coinsApi.getCoins(fromPrice, toPrice),
  });

export { useQueryCoins, coinsKeys };
