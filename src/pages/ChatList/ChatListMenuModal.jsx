import { useDispatch } from "react-redux";
import CustomModal from "../../ui/CustomModal";
import OptionItem from "../../ui/OptionItem";
import OptionMenu from "../../ui/OptionMenu";
import { sidebarActions } from "../../store/sideBarSlice";
import { MODAL, SIDEBAR } from "../../utils/constants";

function ChatListMenuModal() {
  const dispatch = useDispatch();
  return (
    <>
      <CustomModal modal={MODAL.CHATLISTMENU}>
        <OptionMenu>
          <OptionItem
            onClick={() =>
              dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.SETTING))
            }
          >
            Setting
          </OptionItem>
          <OptionItem
            onClick={() =>
              dispatch(sidebarActions.setCurrentSidebar(SIDEBAR.CONTACT))
            }
          >
            Contact
          </OptionItem>
        </OptionMenu>
      </CustomModal>
    </>
  );
}

export default ChatListMenuModal;
