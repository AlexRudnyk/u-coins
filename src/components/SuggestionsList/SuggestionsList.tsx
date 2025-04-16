import { FC } from "react";

import SuggestionsListItem from "../SuggestionsListItem";

import s from "./SuggestionsList.module.scss";

import { Coin } from "@/types/coin";

type Props = {
  searchCoins: Coin[];
};

const SuggestionsList: FC<Props> = ({ searchCoins }) => {
  return (
    <ul className={s.searchList}>
      {searchCoins.map((coin) => (
        <SuggestionsListItem key={coin._id} coin={coin} />
      ))}
    </ul>
  );
};

export default SuggestionsList;
