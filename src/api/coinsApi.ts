import axiosInstance from "./axiosInstance";

import { CoinType } from "@/types/coin";

export const coinsApi = {
  getCoins: async (
    fromPrice?: string,
    toPrice?: string
  ): Promise<CoinType[] | undefined> => {
    try {
      const { data } = await axiosInstance.get<CoinType[]>(
        `coins?fromPrice=${fromPrice}&toPrice=${toPrice}`
      );
      return data ?? [];
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch products";
      throw new Error(errorMessage);
    }
  },
};
