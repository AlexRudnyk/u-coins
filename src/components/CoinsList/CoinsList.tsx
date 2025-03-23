"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import PriceSlider from "../PriceSlider";

import { useQueryCoins } from "@/hooks/useQueryCoins";

const CoinsList = () => {
  const searchParams = useSearchParams();

  const fromPrice = searchParams.get("fromPrice");
  const toPrice = searchParams.get("toPrice");

  const { data: coins } = useQueryCoins(fromPrice || "", toPrice || "");
  if (!coins) return;

  const priceArray = coins.map((coin) => coin.price);

  return (
    <Suspense>
      <PriceSlider prices={priceArray} />
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "20px",
        }}
      >
        {coins?.map((coin) => (
          <li key={coin._id}>
            <Image src={coin.photoURL[0]} alt="coin" width={150} height={150} />
            <p>Price: {coin.price} UAH</p>
          </li>
        ))}
      </ul>
    </Suspense>
  );
};

export default CoinsList;
