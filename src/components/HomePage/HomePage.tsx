import { FC, Suspense } from "react";

import CoinsList from "../CoinsList";
import Filters from "../Filters";

import s from "./HomePage.module.css";

type Props = {
  prices: number[];
};

const HomePage: FC<Props> = ({ prices }) => {
  return (
    <div className={s.container}>
      <div className={s.pageWrapper}>
        <Suspense>
          <Filters prices={prices} />
          <CoinsList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
