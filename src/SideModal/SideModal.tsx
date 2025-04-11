"use client";

import Drawer from "@mui/material/Drawer";

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

import { useSideModalStore } from "@/stores/sideModalStore";

const SideModal = () => {
  const open = useSideModalStore((state) => state.isOpened);
  const toggleOpen = useSideModalStore((state) => state.toggleOpen);
  const type = useSideModalStore((state) => state.type);

  return (
    <Drawer open={open} onClose={toggleOpen} anchor="right">
      {type === "LOGIN" && <LoginForm />}
      {type === "REGISTER" && <RegisterForm />}
    </Drawer>
  );
};

export default SideModal;
