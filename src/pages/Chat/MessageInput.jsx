import { BsSearch, BsSendFill } from "react-icons/bs";

function MessageInput() {
  return (
    <div className="flex shrink-0 justify-center items-center rounded-full border focus-within:border mb-5">
      <input
        type="text"
        className="text-2xl mr-7 p-4 focus-within:outline-none w-full rounded"
        placeholder="Search"
      />
      <span className="text-3xl cursor-pointer">
        <BsSendFill />
      </span>
    </div>
  );
}

export default MessageInput;
