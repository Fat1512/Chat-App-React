function SettingItem({ icon, content }) {
  return (
    <>
      <div className="w-full p-5 flex cursor-pointer hover:bg-slate-100 rounded-md">
        <div className="pr-14 text-4xl">{icon}</div>
        <p className="text-3xl">{content}</p>
      </div>
    </>
  );
}

export default SettingItem;
