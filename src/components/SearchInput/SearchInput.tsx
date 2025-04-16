"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";

import CustomTextField from "../CustomTextField";
import SuggestionsList from "../SuggestionsList";

import s from "./SearchInput.module.scss";

import { coinsApi } from "@/api/coinsApi";
import { Coin } from "@/types/coin";

const SearchInput = () => {
  const [query, setQuery] = useState<string>("");
  const [searchCoins, setSearchCoins] = useState<Coin[]>([]);
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const debouncedGetSearchCoins = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (searchQuery !== "") {
          const res = await coinsApi.getCoins("", "", searchQuery);
          setSearchCoins(res);
        } else {
          setSearchCoins([]);
        }
      }, 300),
    []
  );

  useEffect(() => {
    debouncedGetSearchCoins(query);

    return () => {
      debouncedGetSearchCoins.cancel();
    };
  }, [query, debouncedGetSearchCoins]);

  const initialValues = {
    search: "",
  };

  const handleSubmit = (
    values: { search: string },
    { resetForm }: FormikHelpers<{ search: string }>
  ) => {
    params.delete("fromPrice");
    params.delete("toPrice");
    params.set("q", query);
    push(`search?${params}`);
    resetForm();
  };

  return (
    <div className={s.searchInputWrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, setFieldValue, values }) => (
          <Form className={s.form}>
            <CustomTextField
              name="search"
              values={values.search}
              setFieldValue={setFieldValue}
              onChangeFn={(value: string) => setQuery(value)}
              size="small"
            />
            {errors.search && <div>{errors.search}</div>}

            <Button type="submit" variant="contained">
              Search
            </Button>
          </Form>
        )}
      </Formik>
      {query !== "" && <SuggestionsList searchCoins={searchCoins} />}
    </div>
  );
};

export default SearchInput;
