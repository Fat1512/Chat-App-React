function Button({ children, addedStyle }) {
  return (
    <button
      className={`text-2xl py-4 px-6 bg-orange-500 rounded-lg text-white w-full ${addedStyle}`}
    >
      {children}
    </button>
  );
}

export default Button;
