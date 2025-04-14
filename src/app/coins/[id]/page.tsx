import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import CoinPage from "@/components/CoinPage";

import { coinsApi } from "@/api/coinsApi";
import { coinsKeys } from "@/hooks/useQueryCoins";
import { Coin } from "@/types/coin";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: coinsKeys.getOne(id),
    queryFn: () => coinsApi.getCoinById(id),
  });
  const coin: Coin | undefined = queryClient.getQueryData(coinsKeys.getOne(id));
  if (!coin) return;
  const { title, description } = coin;

  return {
    title,
    description,
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: coinsKeys.getOne(id),
    queryFn: () => coinsApi.getCoinById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoinPage id={id} />
    </HydrationBoundary>
  );
}
