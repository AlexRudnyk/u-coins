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
import { CoinType } from "@/types/coin";

export default async function Home() {
  const queryClient = new QueryClient();

  const fromPrice = "1";
  const toPrice = "1000";
  const q = "";

  await queryClient.prefetchQuery({
    queryKey: coinsKeys.all(fromPrice, toPrice, q),
    queryFn: () => coinsApi.getCoins(fromPrice, toPrice, q),
  });

  const coins: CoinType[] | undefined = queryClient.getQueryData(
    coinsKeys.all(fromPrice, toPrice, q)
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
