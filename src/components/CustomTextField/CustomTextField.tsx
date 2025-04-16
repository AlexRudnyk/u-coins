"use client";

import { FC } from "react";
import { IconButton, TextField } from "@mui/material";
import Image from "next/image";

import closedEye from "../../../public/icons/closed-eye.svg";
import openedEye from "../../../public/icons/opened-eye.svg";

import s from "./CustomTextField.module.scss";

type Props = {
  name: string;
  values: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onChangeFn?: (value: string) => void;
  type?: "text" | "email" | "password" | "number";
  label?: string;
  size?: "small" | "medium";
  showPassword?: boolean;
  handleClickShowPassword?: () => void;
  input?: string;
};

const CustomTextField: FC<Props> = ({
  name,
  values,
  type,
  setFieldValue,
  onChangeFn,
  label,
  size,
  showPassword,
  handleClickShowPassword,
  input,
}) => {
  const paddingRight = input === "password" ? "48px" : "0";

  return (
    <div className={s.wrapper}>
      {input === "password" && (
        <div className={s.iconButton} onClick={handleClickShowPassword}>
          <IconButton>
            <Image
              src={showPassword ? closedEye : openedEye}
              alt="show password eye"
              width={32}
              height={32}
            />
          </IconButton>
        </div>
      )}
      <TextField
        name={name}
        id="outlined-basic"
        label={label}
        variant="outlined"
        type={type}
        onChange={(event) => {
          setFieldValue(name, event.target.value);
          if (onChangeFn) onChangeFn(event.target.value);
        }}
        autoComplete="off"
        value={values}
        size={size}
        sx={{
          width: "100%",
          "& .MuiInputBase-input": {
            paddingRight,
          },
        }}
      />
    </div>
  );
};

export default CustomTextField;
