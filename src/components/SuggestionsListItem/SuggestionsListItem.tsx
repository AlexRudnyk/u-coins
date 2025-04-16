import { FC } from "react";
import { FormikState } from "formik";
import Image from "next/image";
import Link from "next/link";

import s from "./SuggestionsListItem.module.scss";

import { Coin } from "@/types/coin";

type Props = {
  coin: Coin;
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
};

const SuggestionsListItem: FC<Props> = ({
  coin,
  setIsSuggestionsOpen,
  resetForm,
}) => {
  const handleAfterSuggestionClick = () => {
    setIsSuggestionsOpen(false);
    resetForm();
  };

  return (
    <li className={s.searchListItem} onClick={handleAfterSuggestionClick}>
      <Link href={`/coins/${coin._id}`} className={s.searchListItemLink}>
        <div className={s.imageAndTitleWrapper}>
          <Image src={coin.photoURL[0]} alt="coin" width={32} height={32} />
          <p>
            {coin.title} {coin.year}
          </p>
        </div>
        <p>{coin.price} UAH</p>
      </Link>
    </li>
  );
};

export default SuggestionsListItem;
