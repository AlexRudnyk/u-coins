"use client";

import Image from "next/image";

import PriceSlider from "../PriceSlider";

import { useQueryCoins } from "@/hooks/useQueryCoins";

const CoinsList = () => {
  const { data: coins } = useQueryCoins();
  if (!coins) return;

  const priceArray = coins.map((coin) => coin.price);

  return (
    <>
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
    </>
  );
};

export default CoinsList;
