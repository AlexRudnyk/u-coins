"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import s from "./CoinsList.module.css";

import { useQueryCoins } from "@/hooks/useQueryCoins";

const CoinsList = () => {
  const searchParams = useSearchParams();

  const fromPrice = searchParams.get("fromPrice");
  const toPrice = searchParams.get("toPrice");
  const q = searchParams.get("q");

  const { data: coins } = useQueryCoins(
    fromPrice || "",
    toPrice || "",
    q || ""
  );
  if (!coins) return;

  return (
    <ul className={s.coinsList}>
      {coins?.map((coin) => (
        <li key={coin._id}>
          <Image src={coin.photoURL[0]} alt="coin" width={150} height={150} />
          <p>{coin.title}</p>
          <p>Price: {coin.price} UAH</p>
        </li>
      ))}
    </ul>
  );
};

export default CoinsList;
