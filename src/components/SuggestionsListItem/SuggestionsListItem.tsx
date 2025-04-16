import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import s from "./SuggestionsListItem.module.scss";

import { Coin } from "@/types/coin";

type Props = {
  coin: Coin;
};

const SuggestionsListItem: FC<Props> = ({ coin }) => {
  return (
    <li className={s.searchListItem}>
      <Link href={`coins/${coin._id}`} className={s.searchListItemLink}>
        <Image src={coin.photoURL[0]} alt="coin" width={32} height={32} />
        <p>
          {coin.title} {coin.year}
        </p>
        <p>{coin.price} UAH</p>
      </Link>
    </li>
  );
};

export default SuggestionsListItem;
