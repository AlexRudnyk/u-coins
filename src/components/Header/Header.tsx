"use client";

import { Button } from "@mui/material";

import { useAuthStore } from "@/stores/authStore";
import { useSideModalStore } from "@/stores/sideModalStore";

const Header = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const toggleOpen = useSideModalStore((state) => state.toggleOpen);
  const setType = useSideModalStore((state) => state.setType);

  const handleSideModalOpen = (value: "LOGIN" | "REGISTER") => {
    setType(value);
    toggleOpen();
  };

  return isLoggedIn ? (
    <Button type="button" variant="contained" onClick={logout}>
      Logout
    </Button>
  ) : (
    <div>
      <Button type="button" onClick={() => handleSideModalOpen("LOGIN")}>
        Login
      </Button>
      <Button type="button" onClick={() => handleSideModalOpen("REGISTER")}>
        Register
      </Button>
    </div>
  );
};

export default Header;
