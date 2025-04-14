import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import s from "./CoinItem.module.scss";

import { Coin } from "@/types/coin";

type Props = {
  coin: Coin;
};

const CoinItem: FC<Props> = ({ coin }) => {
  return (
    <Link href={`coins/${coin._id}`}>
      <li className={s.coinsListItem}>
        <Image src={coin.photoURL[0]} alt="coin" width={150} height={150} />
        <p>
          {coin.title} {coin.year}
        </p>
        <p>Price: {coin.price} UAH</p>
      </li>
    </Link>
  );
};

export default CoinItem;
