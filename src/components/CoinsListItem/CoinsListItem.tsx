import { FC } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import s from "./CoinsListItem.module.scss";

import { Coin } from "@/types/coin";

type Props = {
  coin: Coin;
};

const CoinsListItem: FC<Props> = ({ coin }) => {
  return (
    <li className={s.coinListItem}>
      <Link href={`coins/${coin._id}`}>
        <div className={s.imageContainer}>
          <Image
            src={coin.photoURL[0]}
            alt="coin"
            width={150}
            height={150}
            className={cn(s.image, s.defaultImage)}
          />
          <Image
            src={coin.photoURL[1]}
            alt="coin"
            width={150}
            height={150}
            className={cn(s.image, s.hoveredImage)}
          />
        </div>
        <p>
          {coin.title} {coin.year}
        </p>
        <p>{coin.spec}</p>
      </Link>
      <p>Price: {coin.price} UAH</p>
    </li>
  );
};

export default CoinsListItem;
