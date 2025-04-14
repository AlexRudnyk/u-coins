"use client";

import { useSearchParams } from "next/navigation";

import CoinItem from "../CoinItem";

import s from "./CoinsList.module.scss";

import { useQueryFilteredCoins } from "@/hooks/useQueryCoins";

const CoinsList = () => {
  const searchParams = useSearchParams();

  const fromPrice = searchParams.get("fromPrice") || "";
  const toPrice = searchParams.get("toPrice") || "";
  const q = searchParams.get("q") || "";

  const { data: coins } = useQueryFilteredCoins(fromPrice, toPrice, q);

  if (!coins) return;

  return (
    <ul className={s.coinsList}>
      {coins?.map((coin) => (
        <CoinItem key={coin._id} coin={coin} />
      ))}
    </ul>
  );
};

export default CoinsList;
