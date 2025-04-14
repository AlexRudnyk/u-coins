import { FC } from "react";

import CoinsList from "../CoinsList";
import Filters from "../Filters";

import s from "./HomePage.module.scss";

type Props = {
  prices: number[];
};

const HomePage: FC<Props> = ({ prices }) => {
  return (
    <div className={s.container}>
      <div className={s.pageWrapper}>
        <Filters prices={prices} />
        <CoinsList />
      </div>
    </div>
  );
};

export default HomePage;
