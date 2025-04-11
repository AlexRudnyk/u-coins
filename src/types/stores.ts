import { LoginBody, RegisterBody } from "./auth";
import { User } from "./user";

export type SideModalState = {
  isOpened: boolean;
  type: string;
};

export type SideModalActions = {
  toggleOpen: () => void;
  setType: (value: "LOGIN" | "REGISTER") => void;
};

export type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
};

export type AuthActions = {
  register: (registerBody: RegisterBody) => Promise<User | undefined>;
  login: (loginBody: LoginBody) => Promise<void>;
  logout: () => Promise<void>;
  clearState: () => void;
};
