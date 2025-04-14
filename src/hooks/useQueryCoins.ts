import { useQuery } from "@tanstack/react-query";

import { coinsApi } from "@/api/coinsApi";

const coinsKeys = {
  all: ["coins"],
  filtered: (fromPrice: string, toPrice: string, q: string) => [
    ["coins", fromPrice, toPrice, q],
  ],
  getOne: (id: string) => [...coinsKeys.all, id],
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

const useQueryCoinById = (id: string) =>
  useQuery({
    queryKey: coinsKeys.getOne(id),
    queryFn: () => coinsApi.getCoinById(id),
  });

export { useQueryFilteredCoins, useQueryCoinById, coinsKeys };
