import { NavLink } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useRegister from "../../hooks/useRegister";

function RegisterForm() {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const { isLoading, register: registerUser } = useRegister();

  function registerr({ name, username, password, repeatPassword }) {
    registerUser({ name, username, password, repeatPassword });
  }

  function error() {}

  return (
    <Form onSubmit={handleSubmit(registerr, error)}>
      <FormRow
        label="Name"
        type="text"
        name="name"
        register={register}
        option={{
          required: "name is required",
        }}
        error={errors?.name?.message}
      />
      <FormRow
        label="Username"
        type="username"
        name="username"
        register={register}
        option={{
          required: "username is required",
        }}
        error={errors?.username?.message}
      />
      <FormRow
        label="Password"
        type="password"
        name="password"
        register={register}
        option={{
          required: "password is required",
        }}
        error={errors?.password?.message}
      />
      <FormRow
        label="Repeat Password"
        type="password"
        name="repeatPassword"
        register={register}
        option={{
          required: "repeat password is required",
          validate: (value) =>
            value === getValues().password || "password doesn't match",
        }}
        error={errors?.repeatPassword?.message}
      />
      <div className="flex justify-end text-2xl my-4">
        <NavLink to="/">Forgot password</NavLink>
      </div>
      <div className="flex">
        <Button disabled={isLoading}>Register</Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
