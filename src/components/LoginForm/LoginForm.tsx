"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";

import CustomTextField from "../CustomTextField";

import s from "./LoginForm.module.css";

import { useAuthStore } from "@/stores/authStore";
import { useSideModalStore } from "@/stores/sideModalStore";
import { InitialLoginValues } from "@/types/initialFormValues";

const LoginForm = () => {
  const login = useAuthStore((state) => state.login);
  const toggleOpen = useSideModalStore((state) => state.toggleOpen);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
    <div className={s.formWrapper}>
      <h3 className={s.formTitle}>Please Log In</h3>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, setFieldValue, values }) => (
          <Form className={s.form}>
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
              type={showPassword ? "text" : "password"}
              label="Password"
              setFieldValue={setFieldValue}
              values={values.password}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              input="password"
            />
            {errors.password && <div>{errors.password}</div>}

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
