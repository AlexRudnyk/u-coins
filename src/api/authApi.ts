import axiosInstance from "./axiosInstance";

import { storageKeys } from "@/helpers/storageKeys";
import { LoginBody, RegisterBody } from "@/types/auth";
import { User } from "@/types/user";

export const authApi = {
  register: async (registerBody: RegisterBody): Promise<User> => {
    try {
      const { data } = await axiosInstance.post<User>(
        "auth/register",
        registerBody
      );
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to register a new user";
      throw new Error(errorMessage);
    }
  },

  login: async (loginBody: LoginBody): Promise<User> => {
    try {
      const { data } = await axiosInstance.post<User>("auth/login", loginBody);
      if (data.accessToken)
        localStorage.setItem(storageKeys.access_token, data.accessToken);
      return data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to login a user";
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    try {
      axiosInstance.get("auth/logout");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to logout";
      throw new Error(errorMessage);
    }
  },

  getCurrentUser: async () => {
    try {
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to get current user";
      throw new Error(errorMessage);
    }
  },
};
