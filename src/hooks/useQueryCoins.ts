import { useQuery } from "@tanstack/react-query";

import { coinsApi } from "@/api/coinsApi";

const coinsKeys = {
  filtered: (fromPrice: string, toPrice: string, q: string) => [
    ["coins", fromPrice, toPrice, q],
  ],
  //   getOne: (id: string) => [...productsKeys.all, id],
};

const useQueryFilteredCoins = (
  fromPrice?: string,
  toPrice?: string,
  q?: string
) =>
  useQuery({
    queryKey: coinsKeys.filtered(fromPrice || "", toPrice || "", q || ""),
    queryFn: () => coinsApi.getCoins(fromPrice, toPrice, q),
  });

export { useQueryFilteredCoins, coinsKeys };
