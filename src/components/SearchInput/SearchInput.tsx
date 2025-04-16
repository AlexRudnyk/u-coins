"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const suggestionsRef = useRef<HTMLUListElement>(null);

  // const handleSuggestionsOpenToggle = () =>
  //   setIsSuggestionsOpen(!isSuggestionsOpen);

  const debouncedGetSearchCoins = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (searchQuery !== "") {
          const res = await coinsApi.getCoins("", "", searchQuery);
          setSearchCoins(res);
          setIsSuggestionsOpen(true);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (
    values: { search: string },
    { resetForm }: FormikHelpers<{ search: string }>
  ) => {
    params.delete("fromPrice");
    params.delete("toPrice");
    params.set("q", query);
    push(`search?${params}`);
    resetForm();
    setIsSuggestionsOpen(false);
  };

  return (
    <div className={s.searchInputWrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, setFieldValue, values, resetForm }) => (
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
            {isSuggestionsOpen && query !== "" && (
              <SuggestionsList
                searchCoins={searchCoins}
                setIsSuggestionsOpen={setIsSuggestionsOpen}
                resetForm={resetForm}
                ref={suggestionsRef}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchInput;
