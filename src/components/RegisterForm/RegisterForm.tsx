"use client";

import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";

import CustomTextField from "../CustomTextField";

import { useMutateLogin, useMutateRegister } from "@/hooks/useQueryAuth";
import { InitialRegisterValues } from "@/types/initialFormValues";

const RegisterForm = () => {
  const { mutateAsync: mutateRegister } = useMutateRegister();
  const { mutateAsync: mutateLogin } = useMutateLogin();

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
    const createdUser = await mutateRegister(values);

    if (createdUser) {
      await mutateLogin({
        email: values.email,
        password: values.password,
      });
      resetForm();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ setFieldValue, errors, values }) => (
        <Form>
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
  );
};

export default RegisterForm;
