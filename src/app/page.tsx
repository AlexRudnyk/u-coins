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

  await queryClient.prefetchQuery({
    queryKey: coinsKeys.all,
    queryFn: coinsApi.getCoins,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinsList />
    </HydrationBoundary>
  );
}
