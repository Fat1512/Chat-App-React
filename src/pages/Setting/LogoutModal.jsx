import { useDispatch } from "react-redux";
import useLogout from "../../hooks/useLogout";
import CustomModal from "../../ui/CustomModal";
import { MODAL } from "../../utils/constants";
import { modalActions } from "../../store/modalSlide";

function LogoutModal() {
  const dispatch = useDispatch();
  const { logout } = useLogout();

  return (
    <>
      <CustomModal modal={MODAL.LOGOUT} shouldCloseOnOverlayClick={true}>
        <div className="p-10 shadow-xl">
          <div className="text-4xl pb-10">Do you want to logout ?</div>
          <div className="flex font-semibold justify-around text-2xl">
            <button className="text-blue-600" onClick={logout}>
              YES
            </button>
            <button
              className="text-red-500"
              onClick={() => dispatch(modalActions.resetState())}
            >
              NO
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default LogoutModal;
