"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import s from "./Logo.module.css";

import { routes } from "@/helpers/routes";

const Logo = () => {
  const currentRoute = usePathname();

  const handleUpClick = () => {
    if (currentRoute === routes.home) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return currentRoute === routes.home ? (
    <p className={s.logoBrand}>U-Coins</p>
  ) : (
    <Link href={routes.home} onClick={handleUpClick}>
      <p className={s.logoBrand}>U-Coins</p>
    </Link>
  );
};

export default Logo;
