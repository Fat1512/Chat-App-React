import { useState } from "react";
import useSocket from "../hooks/useSocket";
import { Stomp } from "@stomp/stompjs";

function Test() {
  const [state, setState] = useState([]);
  function handleState() {
    setState((state) => [...state, 2]);
  }

  return (
    <div className="h-[20rem] bg-orange-100 text-3xl">
      <button onClick={handleState}>click me to send message</button>
    </div>
  );
}

export default Test;
