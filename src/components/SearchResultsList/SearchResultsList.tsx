import { FC } from "react";

import CoinsListItem from "../CoinsListItem";

import s from "./SearchResultsList.module.scss";

import { Coin } from "@/types/coin";

type Props = {
  coins: Coin[];
};

const SearchResultsList: FC<Props> = ({ coins }) => {
  return (
    <ul className={s.coinsList}>
      {coins?.map((coin) => (
        <CoinsListItem key={coin._id} coin={coin} />
      ))}
    </ul>
  );
};

export default SearchResultsList;
