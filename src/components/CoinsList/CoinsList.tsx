"use client";

import { useSearchParams } from "next/navigation";

import CoinsListItem from "../CoinsListItem";

import s from "./CoinsList.module.scss";

import { useQueryFilteredCoins } from "@/hooks/useQueryCoins";

const CoinsList = () => {
  const searchParams = useSearchParams();

  const fromPrice = searchParams.get("fromPrice") || "";
  const toPrice = searchParams.get("toPrice") || "";
  const q = searchParams.get("q") || "";

  const { data: coins } = useQueryFilteredCoins(fromPrice, toPrice, q);

  return (
    <ul className={s.coinsList}>
      {coins?.map((coin) => (
        <CoinsListItem key={coin._id} coin={coin} />
      ))}
    </ul>
  );
};

export default CoinsList;
