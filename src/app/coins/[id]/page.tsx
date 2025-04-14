type Props = {
  params: Promise<{ id: string }>;
};

export default async function Coin({ params }: Props) {
  const { id } = await params;

  return <p>Product: {id}</p>;
}
