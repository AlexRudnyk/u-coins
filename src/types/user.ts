export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  accessToken: string | null;
  createdAt: string;
  updatedAt: string;
};
