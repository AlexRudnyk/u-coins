"use client";

import { useMemo, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const [query, setQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const initialValues = {
    search: "",
  };

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setQuery(value), 500),
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
        <Form>
          <TextField
            name="search"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={(event) => {
              setFieldValue("search", event.target.value);
              debouncedSetQuery(event.target.value);
            }}
            value={values.search}
          />
          {errors.search && <div>{errors.search}</div>}

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchInput;
