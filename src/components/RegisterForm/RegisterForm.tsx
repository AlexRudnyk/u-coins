"use client";

import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";

import CustomTextField from "../CustomTextField";

import s from "./RegisterForm.module.css";

import { useAuthStore } from "@/stores/authStore";
import { useSideModalStore } from "@/stores/sideModalStore";
import { InitialRegisterValues } from "@/types/initialFormValues";

const RegisterForm = () => {
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  const toggleOpen = useSideModalStore((state) => state.toggleOpen);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
              type="password"
              label="Password"
              setFieldValue={setFieldValue}
              values={values.password}
            />
            {errors.password && <div>{errors.password}</div>}
            <CustomTextField
              name="comparePassword"
              type="password"
              label="Compare Password"
              setFieldValue={setFieldValue}
              values={values.comparePassword}
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
