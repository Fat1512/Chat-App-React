import React from "react";
import { useForm } from "react-hook-form";

function Form({ children, onSubmit }) {
  return (
    <form className="w-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
