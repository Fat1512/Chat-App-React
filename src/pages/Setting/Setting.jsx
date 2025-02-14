import { useDispatch } from "react-redux";
import useUser from "../../hooks/useUser";
import { sidebarActions } from "../../store/sideBarSlice";
import ActiveSidebar from "../../ui/ActiveSidebar";
import { SIDEBAR } from "../../utils/constants";
import useUploadAvatar from "../../hooks/useUploadAvatar";
import useLogout from "../../hooks/useLogout";
import toast from "react-hot-toast";
import SideBarHeader from "../SideBar/SideBarHeader";
import {
  BiArrowBack,
  BiLogoKubernetes,
  BiNotification,
  BiSolidNavigation,
  BiSolidPencil,
} from "react-icons/bi";
import SettingItem from "./SettingItem";

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
      <SideBarHeader className="flex items-center justify-around px-3 relative">
        <div
          onClick={() =>
            dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CHATLIST))
          }
          className="text-3xl p-4 full-rounded cursor-pointer"
        >
          <BiArrowBack />
        </div>
        <div className="w-full text-3xl pl-5 font-semibold">Settings</div>
      </SideBarHeader>
      <div className="text-3xl text-center">
        <div className="relative">
          <div className="h-[40rem] overflow-hidden">
            <img className="object-cover h-full w-full" src={user.avt} alt="" />
          </div>
          <div className="z-10 flex flex-col items-start pl-6 absolute bottom-3 text-white">
            <p className="font-semibold text-5xl pb-3">{user.name}</p>
            <p className="text-slate-200 text-2xl">Last seen at just now</p>
          </div>
          <div className="-z-0 absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#4b231e] to-transparent"></div>
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => handleUploadAvatar(e.target.files[0])}
            className="py-5"
          />
        </div>
        <div className="p-3 border-b-[1rem]">
          <SettingItem icon={<BiSolidNavigation />} content={user.id} />
        </div>
        <div className="p-3">
          <SettingItem icon={<BiLogoKubernetes />} content="General Settings" />
        </div>
        <div className="p-3">
          <SettingItem icon={<BiNotification />} content="Notifications" />
        </div>
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
