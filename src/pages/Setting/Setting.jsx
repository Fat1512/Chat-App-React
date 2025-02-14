import { useDispatch } from "react-redux";
import useUser from "../../hooks/useUser";
import { sidebarActions } from "../../store/sideBarSlice";
import ActiveSidebar from "../../ui/ActiveSidebar";
import { MODAL, SIDEBAR } from "../../utils/constants";
import useUploadAvatar from "../../hooks/useUploadAvatar";
import useLogout from "../../hooks/useLogout";
import toast from "react-hot-toast";
import SideBarHeader from "../SideBar/SideBarHeader";
import {
  BiArrowBack,
  BiLogoKubernetes,
  BiNotification,
  BiSolidCalendarExclamation,
  BiSolidNavigation,
  BiSolidPencil,
  BiVoicemail,
} from "react-icons/bi";
import SettingItem from "./SettingItem";
import { BsHddStack } from "react-icons/bs";
import { modalActions } from "../../store/modalSlide";
import SettingMenuModal from "./SettingMenuModal";

function Setting() {
  const { user } = useUser();
  const { isLoading, processFormData, uploadAvatar } = useUploadAvatar();
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
      <SideBarHeader className="text-3xl  flex items-center justify-around px-3 relative">
        <div
          onClick={() =>
            dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CHATLIST))
          }
          className="p-4 full-rounded cursor-pointer"
        >
          <BiArrowBack />
        </div>
        <div className="w-full text-3xl pl-5 font-semibold">Settings</div>
        <div
          className="pr-4 cursor-pointer menu"
          onClick={(e) => {
            const target = e.target.closest(".menu");
            const dimension = target.getBoundingClientRect();
            const x = dimension.x;
            const y = dimension.height + dimension.y;
            dispatch(modalActions.setCurrentModal(MODAL.SETTINGMENU));
            dispatch(
              modalActions.setPosition({
                left: x,
                top: y,
                right: "auto",
                bottom: "auto",
              })
            );
          }}
        >
          <BsHddStack />
        </div>
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
        {/* <div>
          <input
            type="file"
            onChange={(e) => handleUploadAvatar(e.target.files[0])}
            className="py-5"
          />
        </div> */}
        <div className="p-3">
          <SettingItem icon={<BiSolidNavigation />} content={user.id} />
        </div>
        <div className="p-3">
          <SettingItem icon={<BiVoicemail />} content={user.username} />
        </div>
        <div className="p-3 border-b-[1rem]">
          <SettingItem
            icon={<BiSolidCalendarExclamation />}
            content={user.bio}
          />
        </div>

        <div className="p-3">
          <SettingItem icon={<BiLogoKubernetes />} content="General Settings" />
        </div>
        <div className="p-3">
          <SettingItem icon={<BiNotification />} content="Notifications" />
        </div>
      </div>
      <SettingMenuModal />
    </ActiveSidebar>
  );
}

export default Setting;
