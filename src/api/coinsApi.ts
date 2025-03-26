import axiosInstance from "./axiosInstance";

import { CoinType } from "@/types/coin";

export const coinsApi = {
  getCoins: async (
    fromPrice?: string,
    toPrice?: string,
    q?: string
  ): Promise<CoinType[]> => {
    try {
      const { data } = await axiosInstance.get<CoinType[]>(
        `coins?fromPrice=${fromPrice || ""}&toPrice=${toPrice || ""}&q=${
          q || ""
        }`
      );
      return data ?? [];
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch products";
      throw new Error(errorMessage);
    }
  },
};
