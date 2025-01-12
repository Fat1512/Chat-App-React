import { useDispatch } from "react-redux";
import { testActions } from "../store/testSlice";

function Sibling2() {
  const dispatch = useDispatch();

  function increaseId() {
    dispatch(testActions.increaseId());
  }

  return (
    <div>
      <button onClick={increaseId}>Click me to increase age</button>
    </div>
  );
}

export default Sibling2;
