"use client";

import { FC, useMemo, useState } from "react";
import Slider from "@mui/material/Slider";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";

import { useQueryCoins } from "@/hooks/useQueryCoins";

type Props = {
  prices: number[];
};

const PriceSlider: FC<Props> = ({ prices }) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [value, setValue] = useState<number[]>([minPrice, maxPrice]);

  const minDistance = 100;

  const debouncedPush = useMemo(
    () =>
      debounce((params: URLSearchParams) => {
        push(`?${params.toString()}`);
      }, 500),
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
    <div style={{ padding: "30px", width: "300px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "30px",
            border: "1px solid gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value[0]}
        </div>
        <div> - </div>
        <div
          style={{
            width: "70px",
            height: "30px",
            border: "1px solid gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value[1]}
        </div>
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
