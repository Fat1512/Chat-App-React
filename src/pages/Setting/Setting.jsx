import { useDispatch } from "react-redux";
import useUser from "../../hooks/useUser";
import { sidebarActions } from "../../store/sideBarSlice";
import ActiveSidebar from "../../ui/ActiveSidebar";
import { SIDEBAR } from "../../utils/constants";
import { uploadImage } from "../../services/userAPI";

function Setting() {
  const { user } = useUser();
  const dispatch = useDispatch();
  function change(event) {
    console.log(event.target.files, event.target.extraFileData);
    const currentFile = event.target.files[0];
    let formData = new FormData();
    formData.append("file", currentFile);
    uploadImage(formData);
  }
  return (
    <ActiveSidebar sidebarName={SIDEBAR.SETTING}>
      <div
        onClick={() =>
          dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CHATLIST))
        }
        className="text-2xl p-3 full-rounded cursor-pointer bg-slate-200"
      >
        back button
      </div>
      <div>
        <input type="file" onChange={change} />
      </div>
      <div>
        <p>id: {user.id}</p>
        <p>bio: {user.bio}</p>
        <img src={user.avt} alt="" />
      </div>
    </ActiveSidebar>
  );
}

export default Setting;
