import { useDispatch } from "react-redux";
import CustomModal from "../../ui/CustomModal";
import OptionItem from "../../ui/OptionItem";
import OptionMenu from "../../ui/OptionMenu";
import { sidebarActions } from "../../store/sideBarSlice";
import { MODAL, SIDEBAR } from "../../utils/constants";
import { BiLogoKubernetes, BiSolidContact } from "react-icons/bi";

function ChatListMenuModal() {
  const dispatch = useDispatch();
  return (
    <>
      <CustomModal modal={MODAL.CHATLIST_MENU}>
        <div className="p-2 shadow-xl">
          <OptionMenu>
            <OptionItem
              onClick={() =>
                dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.SETTING))
              }
              icon={<BiLogoKubernetes />}
              content="Setting"
            />
            <OptionItem
              onClick={() =>
                dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CONTACT))
              }
              icon={<BiSolidContact />}
              content="Contact"
            />
          </OptionMenu>
        </div>
      </CustomModal>
    </>
  );
}

export default ChatListMenuModal;
