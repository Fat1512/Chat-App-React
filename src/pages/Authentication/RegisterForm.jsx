import { NavLink } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";
import { useState } from "react";

function RegisterForm() {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();

  function f() {
    console.log("ads");
  }
  function captureUsername(e) {
    setUsername(e.target.value);
  }
  function capturePassword(e) {
    setPassword(e.target.value);
  }
  function captureConfirmedPassword(e) {
    setRepeatPassword(e.target.value);
  }
  return (
    <Form onSubmit={handleSubmit(f)}>
      <FormRow
        label="Username"
        type="username"
        name="username"
        register={register}
        option={{
          required: "username is required",
        }}
        onChange={captureUsername}
        error={errors?.username?.message}
      />
      <FormRow
        label="Password"
        type="password"
        name="password"
        register={register}
        option={{
          required: "username is required",
        }}
        onChange={capturePassword}
        error={errors?.password?.message}
      />
      <FormRow
        label="Repeat Password"
        type="password"
        name="repeatPassword"
        register={register}
        option={{
          required: "password is required",
          validate: (value) =>
            value === getValues().password || "password doesn't match",
        }}
        onChange={captureConfirmedPassword}
        error={errors?.repeatPassword?.message}
      />
      <div className="flex justify-end text-2xl my-4">
        <NavLink to="/">Forgot password</NavLink>
      </div>
      <div className="flex">
        <Button>Login</Button>
      </div>
    </Form>
  );
}

export default RegisterForm;
