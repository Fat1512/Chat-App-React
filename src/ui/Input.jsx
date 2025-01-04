import { forwardRef } from "react";

function Input({ addedStyle, ...props }) {
  return (
    <>
      <input
        ref={props.innerRef}
        type={props.type}
        {...(props.register
          ? { ...props.register(props.name, props.option) }
          : null)}
        className={`rounded-lg p-3 text-2xl my-2 ${addedStyle}`}
        onChange={props.onChange}
      />
      {props.error && <p className="text-red-500">{props.error}</p>}
    </>
  );
}

export default Input;
