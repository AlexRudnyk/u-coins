"use client";

import { Button } from "@mui/material";
import Link from "next/link";

import { routes } from "@/helpers/routes";
import { useAuthStore } from "@/store";

const Header = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  return isLoggedIn ? (
    <Button type="button" variant="contained" onClick={logout}>
      Logout
    </Button>
  ) : (
    <div>
      <Link href={routes.login}>Login</Link>
      <Link href={routes.register}>Register</Link>
    </div>
  );
};

export default Header;
