"use client";

import { Button } from "@mui/material";

import { useMutateLogout } from "@/hooks/useQueryAuth";

const Header = () => {
  const { mutateAsync } = useMutateLogout();

  return (
    <Button type="button" variant="contained" onClick={() => mutateAsync}>
      Logout
    </Button>
  );
};

export default Header;
