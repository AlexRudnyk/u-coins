import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import CoinsList from "@/components/CoinsList";
import PriceSlider from "@/components/PriceSlider";

import { coinsApi } from "@/api/coinsApi";
import { coinsKeys } from "@/hooks/useQueryCoins";
import { CoinType } from "@/types/coin";

export default async function Home() {
  const queryClient = new QueryClient();

  const fromPrice = "1";
  const toPrice = "1000";

  await queryClient.prefetchQuery({
    queryKey: coinsKeys.all(fromPrice, toPrice),
    queryFn: () => coinsApi.getCoins(fromPrice, toPrice),
  });

  const coins: CoinType[] | undefined = queryClient.getQueryData(
    coinsKeys.all(fromPrice, toPrice)
  );
  const priceArray = coins?.map((coin) => coin.price) ?? [];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PriceSlider prices={priceArray} />
      <CoinsList />
    </HydrationBoundary>
  );
}
