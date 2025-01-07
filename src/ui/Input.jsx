function Input({ ...props }) {
  return (
    <>
      <input
        type={props.type}
        {...(props.register
          ? { ...props.register(props.name, props.option) }
          : null)}
        className="rounded-lg text-3xl p-4 mt-4 w-full"
        onChange={props.onChange}
      />
      {props.error && <p className="text-red-500">{props.error}</p>}
    </>
  );
}

export default Input;
