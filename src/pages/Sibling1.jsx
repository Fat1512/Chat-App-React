import { useSelector } from "react-redux";

function Sibling1() {
  const age = useSelector((state) => state.testReducer.id);
  console.log(age);
  return <div>age</div>;
}

export default Sibling1;
