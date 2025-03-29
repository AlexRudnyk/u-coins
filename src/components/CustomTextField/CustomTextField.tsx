"use client";

import { FC } from "react";
import { TextField } from "@mui/material";

type Props = {
  name: string;
  values: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  debouncedFn?: (value: string) => void;
  type?: "text" | "email" | "password" | "number";
  label: string;
};

const CustomTextField: FC<Props> = ({
  name,
  values,
  type,
  setFieldValue,
  debouncedFn,
  label,
}) => {
  return (
    <TextField
      name={name}
      id="outlined-basic"
      label={label}
      variant="outlined"
      type={type}
      onChange={(event) => {
        setFieldValue(name, event.target.value);
        if (debouncedFn) debouncedFn(event.target.value);
      }}
      value={values}
    />
  );
};

export default CustomTextField;
