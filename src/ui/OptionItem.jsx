function OptionItem({ children, onClick }) {
  return (
    <div onClick={onClick} className="w-full p-3 border border-1">
      {children}
    </div>
  );
}

export default OptionItem;
