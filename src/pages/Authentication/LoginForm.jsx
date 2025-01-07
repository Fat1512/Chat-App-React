import { NavLink } from "react-router-dom";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/useLogin";
import { useRef, useState } from "react";

function LoginForm() {
  const { isLoading, login } = useLogin();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function success() {
    // console.log(username, password);
    login({ username, password });
  }
  function error() {
    alert("Co loi xay ra roi huhu !");
  }

  function captureUsername(e) {
    setUsername(e.target.value);
  }

  function capturePassword(e) {
    setPassword(e.target.value);
  }
  return (
    <Form onSubmit={handleSubmit(success, error)}>
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
          required: "password is required",
        }}
        onChange={capturePassword}
        error={errors?.password?.message}
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

export default LoginForm;
