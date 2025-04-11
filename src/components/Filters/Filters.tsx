import { FC } from "react";

import PriceSlider from "../PriceSlider";

import s from "./Filters.module.css";

type Props = {
  prices: number[];
};

const Filters: FC<Props> = ({ prices }) => {
  return (
    <div>
      <PriceSlider prices={prices} />
    </div>
  );
};

export default Filters;
