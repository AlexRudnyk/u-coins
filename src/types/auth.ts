import { User } from "./user";

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
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
};
