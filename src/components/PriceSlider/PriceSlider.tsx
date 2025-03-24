"use client";

import { FC, useMemo, useState } from "react";
import Slider from "@mui/material/Slider";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";

import s from "./PriceSlider.module.css";

type Props = {
  prices: number[];
};

const PriceSlider: FC<Props> = ({ prices }) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const minPrice = Number(params.get("fromPrice")) || Math.min(...prices);
  const maxPrice = Number(params.get("toPrice")) || Math.max(...prices);

  const [value, setValue] = useState<number[]>([minPrice, maxPrice]);

  const minDistance = 50;

  const debouncedPush = useMemo(
    () =>
      debounce((params: URLSearchParams) => {
        push(`?${params}`);
      }, 300),
    [push]
  );

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      params.set("fromPrice", String(newValue[0]));
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      params.set("toPrice", String(newValue[1]));
    }
    debouncedPush(params);
  };

  return (
    <div className={s.container}>
      <div className={s.priceRangeWrapper}>
        <div className={s.priceIndicator}>{value[0]}</div>
        <div> - </div>
        <div className={s.priceIndicator}>{value[1]}</div>
      </div>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        min={100}
        max={800}
        step={50}
      />
    </div>
  );
};

export default PriceSlider;
