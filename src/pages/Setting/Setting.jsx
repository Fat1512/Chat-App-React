import { useDispatch } from "react-redux";
import useUser from "../../hooks/useUser";
import { sidebarActions } from "../../store/sideBarSlice";
import ActiveSidebar from "../../ui/ActiveSidebar";
import { SIDEBAR } from "../../utils/constants";
import useUploadAvatar from "../../hooks/useUploadAvatar";

function Setting() {
  const { user } = useUser();
  const { isLoading, uploadAvatar } = useUploadAvatar();
  const dispatch = useDispatch();

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
        <input type="file" onChange={(e) => uploadAvatar(e.target.files[0])} />
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
