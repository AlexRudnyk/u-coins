import { FC } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

import s from "./BreadCrumbs.module.scss";

import { Crumb } from "@/types/crumbs";

type Props = {
  crumbs: Crumb[];
};
const BreadCrumbs: FC<Props> = ({ crumbs }) => {
  return (
    <div role="presentation" className={s.crumbs}>
      <Breadcrumbs aria-label="breadcrumb">
        {crumbs.map(({ id, label, link }, index) =>
          index === crumbs.length - 1 ? (
            <p key={id}>{label}</p>
          ) : (
            <Link key={id} color="inherit" href={`${link}`}>
              {label}
            </Link>
          )
        )}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
