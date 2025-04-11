"use client";

import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";

import CustomTextField from "../CustomTextField";

import { useAuthStore } from "@/stores/authStore";
import { useSideModalStore } from "@/stores/sideModalStore";
import { InitialLoginValues } from "@/types/initialFormValues";

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const toggleOpen = useSideModalStore((state) => state.toggleOpen);

  const initialValues: InitialLoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (
    values: InitialLoginValues,
    { resetForm }: FormikHelpers<InitialLoginValues>
  ) => {
    login(values);
    toggleOpen();
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ errors, setFieldValue, values }) => (
        <Form>
          <CustomTextField
            name="email"
            type="email"
            label="Email"
            setFieldValue={setFieldValue}
            values={values.email}
          />
          {errors.email && <div>{errors.email}</div>}
          <CustomTextField
            name="password"
            type="password"
            label="Password"
            setFieldValue={setFieldValue}
            values={values.password}
          />
          {errors.password && <div>{errors.password}</div>}

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
