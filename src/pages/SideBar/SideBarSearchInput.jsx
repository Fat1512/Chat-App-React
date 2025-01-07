import { BsSearch } from "react-icons/bs";

function SideBarSearchInput() {
  return (
    <div className="flex justify-center items-center rounded-full border focus-within:border">
      <span className="text-2xl mx-4">
        <BsSearch />
      </span>
      <input
        type="text"
        className="text-2xl mr-7 p-4 focus-within:outline-none"
        placeholder="Search"
      />
    </div>
  );
}

export default SideBarSearchInput;
