import { FC, RefObject } from "react";
import { FormikState } from "formik";

import SuggestionsListItem from "../SuggestionsListItem";

import s from "./SuggestionsList.module.scss";

import { Coin } from "@/types/coin";

type Props = {
  searchCoins: Coin[];
  setIsSuggestionsOpen: (arg: boolean) => void;
  resetForm: (
    nextState?:
      | Partial<
          FormikState<{
            search: string;
          }>
        >
      | undefined
  ) => void;
  ref: RefObject<HTMLUListElement | null>;
};

const SuggestionsList: FC<Props> = ({
  searchCoins,
  setIsSuggestionsOpen,
  resetForm,
  ref,
}) => {
  return (
    <ul className={s.searchList} ref={ref}>
      {searchCoins.map((coin) => (
        <SuggestionsListItem
          key={coin._id}
          coin={coin}
          setIsSuggestionsOpen={setIsSuggestionsOpen}
          resetForm={resetForm}
        />
      ))}
    </ul>
  );
};

export default SuggestionsList;
