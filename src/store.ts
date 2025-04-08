import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authApi } from "./api/authApi";
import { AuthActions, AuthState, LoginBody, RegisterBody } from "./types/auth";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isRefreshing: false,
      error: null,
      register: async (registerBody: RegisterBody) => {
        set({ isRefreshing: true });

        try {
          const registeredUser = await authApi.register(registerBody);
          return registeredUser;
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Failed to register a user";
          set({ error: errorMessage });
        } finally {
          set({ isRefreshing: false });
        }
      },

      login: async (loginBody: LoginBody) => {
        set({ isRefreshing: true });

        try {
          const loggedInUser = await authApi.login(loginBody);
          set({ user: loggedInUser, isLoggedIn: true });
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Failed to login a user";
          set({ error: errorMessage });
        } finally {
          set({ isRefreshing: false });
        }
      },
    }),
    { name: "auth-store" }
  )
);
