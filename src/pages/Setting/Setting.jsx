import { useDispatch } from "react-redux";
import useUser from "../../hooks/useUser";
import { sidebarActions } from "../../store/sideBarSlice";
import ActiveSidebar from "../../ui/ActiveSidebar";
import { SIDEBAR } from "../../utils/constants";
import useUploadAvatar from "../../hooks/useUploadAvatar";
import useLogout from "../../hooks/useLogout";
import toast from "react-hot-toast";

function Setting() {
  const { user } = useUser();
  const { isLoading, processFormData, uploadAvatar } = useUploadAvatar();
  const { logout } = useLogout();
  const dispatch = useDispatch();

  function handleUploadAvatar(file) {
    toast.success("Uploading");

    const processedFormData = processFormData(file);
    uploadAvatar(processedFormData, {
      onSuccess: (data) => {
        user.avt = data;
      },
    });
  }

  return (
    <ActiveSidebar sidebarName={SIDEBAR.SETTING}>
      <div
        onClick={() =>
          dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CHATLIST))
        }
        className="text-2xl p-5 cursor-pointer bg-slate-200"
      >
        Back
      </div>

      <div className="text-3xl text-center">
        <img src={user.avt} alt="" />
        <div>
          <input
            type="file"
            onChange={(e) => handleUploadAvatar(e.target.files[0])}
            className="py-5"
          />
        </div>
        <p className="py-2">Id: {user.id}</p>
        <p>Bio: {user.bio}</p>
        <button
          className="rounded-full bg-orange-300 mt-5 p-5"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </ActiveSidebar>
  );
}

export default Setting;
