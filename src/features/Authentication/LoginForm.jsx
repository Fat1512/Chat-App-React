import { NavLink } from "react-router-dom";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Row from "../../ui/Row";
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
    login(username, password);
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
      <FormRow addedStyle="flex-col" label={"Username"}>
        <Input
          register={register}
          name="username"
          option={{
            required: "username is required",
          }}
          onChange={captureUsername}
          error={errors?.username?.message}
        />
      </FormRow>

      <FormRow label={"Password"} addedStyle="flex-col">
        <Input
          type="password"
          register={register}
          name="password"
          option={{
            required: "password is required",
          }}
          onChange={capturePassword}
          error={errors?.password?.message}
        />
      </FormRow>

      <FormRow addedStyle="justify-end">
        <NavLink to="/">Forgot password</NavLink>
      </FormRow>
      <FormRow>
        <Button>Login</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
