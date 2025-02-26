function Input({ ...props }) {
  return (
    <>
      <input
        defaultValue={props.valueInput}
        type={props.type}
        {...(props.register
          ? { ...props.register(props.name, props.option) }
          : null)}
        className="rounded-lg text-3xl p-4 mt-4 w-full border border-1"
        onChange={props.onChange}
      />
      {props.error && <p className="text-red-500">{props.error}</p>}
    </>
  );
}

export default Input;
