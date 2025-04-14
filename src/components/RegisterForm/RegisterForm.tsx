"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";

import CustomTextField from "../CustomTextField";

import s from "./RegisterForm.module.scss";

import { useAuthStore } from "@/stores/authStore";
import { useSideModalStore } from "@/stores/sideModalStore";
import { InitialRegisterValues } from "@/types/initialFormValues";

const RegisterForm = () => {
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  const toggleOpen = useSideModalStore((state) => state.toggleOpen);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues: InitialRegisterValues = {
    name: "",
    email: "",
    password: "",
    comparePassword: "",
  };

  const handleSubmit = async (
    values: InitialRegisterValues,
    { resetForm }: FormikHelpers<InitialRegisterValues>
  ) => {
    if (values.password !== values.comparePassword) {
      console.log("PASSWORD DOESN'T MATCH");
      return;
    }
    const createdUser = await register(values);

    if (createdUser) {
      await login({
        email: values.email,
        password: values.password,
      });
      toggleOpen();
      resetForm();
    }
  };

  return (
    <div className={s.formWrapper}>
      <h3 className={s.formTitle}>Please Register</h3>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, errors, values }) => (
          <Form className={s.form}>
            <CustomTextField
              name="name"
              label="Name"
              setFieldValue={setFieldValue}
              values={values.name}
            />
            {errors.name && <div>{errors.name}</div>}
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
            <CustomTextField
              name="comparePassword"
              type={showPassword ? "text" : "password"}
              label="Compare Password"
              setFieldValue={setFieldValue}
              values={values.comparePassword}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              input="password"
            />
            {errors.comparePassword && <div>{errors.comparePassword}</div>}

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
