import { useQuery } from "@tanstack/react-query";

import { coinsApi } from "@/api/coinsApi";

const coinsKeys = {
  all: ["coins"],
  //   getOne: (id: string) => [...productsKeys.all, id],
};

const useQueryCoins = () =>
  useQuery({
    queryKey: coinsKeys.all,
    queryFn: () => coinsApi.getCoins(),
  });

export { useQueryCoins, coinsKeys };
