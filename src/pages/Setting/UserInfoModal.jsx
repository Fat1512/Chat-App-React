import CustomModal from "../../ui/CustomModal";
import { MODAL } from "../../utils/constants";

function UserInfoModal() {
  return (
    <>
      <CustomModal modal={MODAL.LOGOUT} shouldCloseOnOverlayClick={true}>
        <div className=""></div>
      </CustomModal>
    </>
  );
}

export default UserInfoModal;
