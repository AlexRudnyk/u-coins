import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import CoinsList from "@/components/CoinsList";
import PriceSlider from "@/components/PriceSlider";
import SearchInput from "@/components/SearchInput";

import { coinsApi } from "@/api/coinsApi";
import { coinsKeys } from "@/hooks/useQueryCoins";
import { Coin } from "@/types/coin";

export default async function Home() {
  const queryClient = new QueryClient();

  const fromPrice = "";
  const toPrice = "";
  const q = "";

  await queryClient.prefetchQuery({
    queryKey: coinsKeys.filtered(fromPrice, toPrice, q),
    queryFn: () => coinsApi.getCoins(fromPrice, toPrice, q),
  });

  const coins: Coin[] | undefined = queryClient.getQueryData(
    coinsKeys.filtered(fromPrice, toPrice, q)
  );
  const priceArray = coins?.map((coin) => coin.price) ?? [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <SearchInput />
        <PriceSlider prices={priceArray} />
        <CoinsList />
      </Suspense>
    </HydrationBoundary>
  );
}
