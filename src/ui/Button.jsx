function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-2xl py-4 px-6 bg-orange-500 rounded-lg text-white w-full"
    >
      {children}
    </button>
  );
}

export default Button;
