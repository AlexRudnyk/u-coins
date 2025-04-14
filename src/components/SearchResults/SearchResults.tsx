"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import CoinsList from "../CoinsList";
import CoinsListItem from "../CoinsListItem";

import s from "./SearchResults.module.scss";

import { useQueryFilteredCoins } from "@/hooks/useQueryCoins";

const SearchResults = () => {
  const searchParams = useSearchParams();

  const fromPrice = searchParams.get("fromPrice") || "";
  const toPrice = searchParams.get("toPrice") || "";
  const q = searchParams.get("q") || "";

  const { data: coins } = useQueryFilteredCoins(fromPrice, toPrice, q);

  if (!coins) return;

  console.log("RESULT", coins);

  return (
    <div className={s.container}>
      <ul className={s.coinsList}>
        {coins?.map((coin) => (
          <CoinsListItem key={coin._id} coin={coin} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
