import { NavLink } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { useForm } from "react-hook-form";

function RegisterForm() {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  function f() {
    console.log("ads");
  }
  function e() {
    console.log("rrpr");
  }
  return (
    <Form className="w-full" onSubmit={handleSubmit(f, e)}>
      <FormRow label={"Username"} addedStyle="flex-col">
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

      <FormRow label={"Repeat Password"} addedStyle="flex-col">
        <Input
          type="password"
          register={register}
          name="repeatPassword"
          option={{
            required: "password is required",
            validate: (value) =>
              value === getValues().password || "password doesn't match",
          }}
          error={errors?.repeatPassword?.message}
        />
      </FormRow>

      <FormRow addedStyle="justify-end">
        <NavLink to="/">Forgot password</NavLink>
      </FormRow>
      <FormRow>
        <Button>Register</Button>
      </FormRow>
    </Form>
  );
}

export default RegisterForm;
