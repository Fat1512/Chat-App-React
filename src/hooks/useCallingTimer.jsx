import { useState } from "react";

function useCallingTimer() {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState();
  function startTimer() {
    const intervalId = setInterval(() => setTime((state) => state + 1), 1000);
    setIntervalId(intervalId);
  }

  function stopTimer() {
    setTime(0);
    clearInterval(intervalId);
  }

  return {
    startTimer,
    stopTimer,
    time,
  };
}

export default useCallingTimer;
