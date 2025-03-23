import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import CoinsList from "@/components/CoinsList";

import { coinsApi } from "@/api/coinsApi";
import { coinsKeys } from "@/hooks/useQueryCoins";

export default async function Home() {
  const queryClient = new QueryClient();

  const fromPrice = "1";
  const toPrice = "1000";

  await queryClient.prefetchQuery({
    queryKey: ["coins", fromPrice, toPrice],
    queryFn: () => coinsApi.getCoins(fromPrice, toPrice),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        <CoinsList />
      </Suspense>
    </HydrationBoundary>
  );
}
