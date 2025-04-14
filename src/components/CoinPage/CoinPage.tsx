"use client";

import { FC } from "react";
import Image from "next/image";

import s from "./CoinPage.module.scss";

import { useQueryCoinById } from "@/hooks/useQueryCoins";

type Props = {
  id: string;
};

const CoinPage: FC<Props> = ({ id }) => {
  const { data: coin } = useQueryCoinById(id);
  if (!coin) return;

  const { photoURL, title, year } = coin;

  return (
    <div>
      <Image src={photoURL[0]} alt="coin" width={300} height={300} />
      <p>
        {title} {year}
      </p>
    </div>
  );
};

export default CoinPage;
