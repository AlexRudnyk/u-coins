"use client";

import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";

import BreadCrumbs from "../BreadCrumbs";
import CoinsListItem from "../CoinsListItem";

import s from "./SearchResults.module.scss";

import { routes } from "@/helpers/routes";
import { useQueryFilteredCoins } from "@/hooks/useQueryCoins";
import { Crumb } from "@/types/crumbs";

const breadCrumbs: Crumb[] = [
  {
    id: 1,
    label: "Home",
    link: routes.home,
  },
  {
    id: 2,
    label: "Search",
    link: "",
  },
];

const SearchResults = () => {
  const searchParams = useSearchParams();

  const fromPrice = "";
  const toPrice = "";
  const q = searchParams.get("q") || "";

  const { data: coins, isPending } = useQueryFilteredCoins(
    fromPrice,
    toPrice,
    q
  );

  return (
    <div className={s.container}>
      <BreadCrumbs crumbs={breadCrumbs} />
      {isPending ? (
        <div className={s.flexWrapper}>
          <CircularProgress />
        </div>
      ) : coins && coins.length > 0 ? (
        <ul className={s.coinsList}>
          {coins?.map((coin) => (
            <CoinsListItem key={coin._id} coin={coin} />
          ))}
        </ul>
      ) : (
        <div className={s.flexWrapper}>
          <p className={s.notFoundText}>
            There is nothing found. Please specify your request
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
