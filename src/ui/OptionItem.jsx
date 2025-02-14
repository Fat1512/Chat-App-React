function OptionItem({ icon, content, onClick }) {
  return (
    <div
      onClick={onClick}
      className="hover:bg-slate-100 w-full p-3 rounded-xl flex text-2xl"
    >
      <div className="pr-4">{icon}</div>
      <div>{content}</div>
    </div>
  );
}

export default OptionItem;
