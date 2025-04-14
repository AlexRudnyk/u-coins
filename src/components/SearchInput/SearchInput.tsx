"use client";

import { useMemo, useState } from "react";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";

import CustomTextField from "../CustomTextField";

import s from "./SearchInput.module.scss";

const SearchInput = () => {
  const [query, setQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const initialValues = {
    search: "",
  };

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setQuery(value), 300),
    []
  );

  const handleSubmit = (
    values: { search: string },
    { resetForm }: FormikHelpers<{ search: string }>
  ) => {
    params.set("q", query);
    push(`?${params}`);
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ errors, setFieldValue, values }) => (
        <Form className={s.form}>
          <CustomTextField
            name="search"
            values={values.search}
            setFieldValue={setFieldValue}
            debouncedFn={debouncedSetQuery}
            size="small"
          />
          {errors.search && <div>{errors.search}</div>}

          <Button type="submit" variant="contained">
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchInput;
