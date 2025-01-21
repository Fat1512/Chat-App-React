function OptionMenu({ children }) {
  return (
    <div className="w-[25rem] absolute z-1 top-full cursor-pointer bg-white border border-1">
      {children}
    </div>
  );
}

export default OptionMenu;
