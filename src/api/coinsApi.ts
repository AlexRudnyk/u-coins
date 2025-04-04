import axiosInstance from "./axiosInstance";

import { Coin } from "@/types/coin";

export const coinsApi = {
  getCoins: async (
    fromPrice?: string,
    toPrice?: string,
    q?: string
  ): Promise<Coin[]> => {
    try {
      const { data } = await axiosInstance.get<Coin[]>(
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
