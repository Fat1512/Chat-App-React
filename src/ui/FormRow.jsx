import Input from "./Input";
import Label from "./Label";

function FormRow({ ...props }) {
  return (
    <div className="flex py-3 text-2xl content-center flex-col">
      <Label>{props?.label}</Label>
      <Input
        register={props?.register}
        name={props?.name}
        type={props?.type}
        option={props?.option}
        onChange={props?.onChange}
        error={props?.error}
      />
    </div>
  );
}

export default FormRow;
