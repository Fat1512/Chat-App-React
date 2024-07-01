import { NavLink } from "react-router-dom";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  function f() {
    console.log("ads");
  }
  function e() {
    console.log("rrpr");
  }
  return (
    <Form onSubmit={handleSubmit(f, e)}>
      <FormRow addedStyle="flex-col" label={"Username"}>
        <Input
          register={register}
          name="username"
          option={{
            required: "username is required",
          }}
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
