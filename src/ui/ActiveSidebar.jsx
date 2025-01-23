import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { sidebarActions } from "../store/sideBarSlice";

function ActiveSidebar({ sidebarName, children }) {
  const { currentActive } = useSelector((state) => state.sideBarReducer);
  if (currentActive != sidebarName) return;
  return <div>{children}</div>;
}

export default ActiveSidebar;
