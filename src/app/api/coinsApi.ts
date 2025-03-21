import axiosInstance from "./axiosInstance";

import { CoinType } from "@/types/coin";

export const coinsApi = {
  getCoins: async (): Promise<CoinType[] | undefined> => {
    try {
      const { data } = await axiosInstance.get("coins");
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch products";
      throw new Error(errorMessage);
    }
  },
};
