function Button({ children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-2xl py-4 px-6 rounded-lg text-white w-full"
    >
      {children}
    </button>
  );
}

export default Button;
