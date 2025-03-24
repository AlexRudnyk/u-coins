"use client";

import { Button, TextField } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";

import s from "./SearchInput.module.css";
const SearchInput = () => {
  const initialValues = {
    search: "",
  };

  const handleSubmit = (
    values: { search: string },
    { resetForm }: FormikHelpers<{ search: string }>
  ) => {
    console.log("VALUES", values);
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
            onChange={(event) => setFieldValue("search", event.target.value)}
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
