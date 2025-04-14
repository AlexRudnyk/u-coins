"use client";

import { FC } from "react";
import Image from "next/image";

import BreadCrumbs from "../BreadCrumbs";

import s from "./CoinPage.module.scss";

import { routes } from "@/helpers/routes";
import { useQueryCoinById } from "@/hooks/useQueryCoins";
import { Crumb } from "@/types/crumbs";

type Props = {
  id: string;
};

const CoinPage: FC<Props> = ({ id }) => {
  const { data: coin } = useQueryCoinById(id);
  if (!coin) return;

  const { photoURL, title, year } = coin;

  const breadCrumbs: Crumb[] = [
    {
      id: 1,
      label: "Home",
      link: routes.home,
    },
    {
      id: 2,
      label: `${title} ${year}`,
      link: "",
    },
  ];

  return (
    <div className={s.container}>
      <BreadCrumbs crumbs={breadCrumbs} />
      <Image src={photoURL[0]} alt="coin" width={300} height={300} />
      <p>
        {title} {year}
      </p>
    </div>
  );
};

export default CoinPage;
