import { NavLink } from "react-router-dom";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/useLogin";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function LoginForm() {
  const { isLoading, login } = useLogin();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function loging({ username, password }) {
    login({ username, password });
  }
  function error() {
    toast.error("Error occured");
  }

  return (
    <Form onSubmit={handleSubmit(loging, error)}>
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
      <div className="flex justify-end text-2xl my-4">
        <NavLink to="/">Forgot password</NavLink>
      </div>
      <div className="flex">
        <Button disabled={isLoading}>Login</Button>
      </div>
    </Form>
  );
}

export default LoginForm;
