import { useDispatch } from "react-redux";
import { MODAL } from "../../utils/constants";
import { BiLogoKubernetes, BiSolidContact } from "react-icons/bi";
import OptionMenu from "../../ui/OptionMenu";
import OptionItem from "../../ui/OptionItem";
import CustomModal from "../../ui/CustomModal";
import { modalActions } from "../../store/modalSlide";

function SettingMenuModal() {
  const dispatch = useDispatch();
  return (
    <>
      <CustomModal modal={MODAL.SETTING_MENU}>
        <div className="p-2">
          <OptionMenu>
            <OptionItem
              onClick={() =>
                dispatch(modalActions.setCurrentModal(MODAL.LOGOUT))
              }
              icon={<BiLogoKubernetes />}
              content="Logout"
            />
            <OptionItem
              onClick={() =>
                dispatch(modalActions.setCurrentModal(MODAL.USERINFO))
              }
              icon={<BiSolidContact />}
              content="User Info"
            />
          </OptionMenu>
        </div>
      </CustomModal>
    </>
  );
}

export default SettingMenuModal;
