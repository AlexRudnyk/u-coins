import { create } from "zustand";
import { persist } from "zustand/middleware";

import { authApi } from "./api/authApi";
import { AuthActions, AuthState, LoginBody } from "./types/auth";

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isRefreshing: false,
      error: null,
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
