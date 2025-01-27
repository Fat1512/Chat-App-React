import { BsSearch } from "react-icons/bs";

function SideBarSearchInput() {
  return (
    <div className="flex w-full justify-center items-center rounded-full border focus-within:border">
      <span className="text-2xl mx-4">
        <BsSearch />
      </span>
      <input
        type="text"
        className="text-2xl w-full mr-7 p-4 focus-within:outline-none"
        placeholder="Search"
      />
    </div>
  );
}

export default SideBarSearchInput;
