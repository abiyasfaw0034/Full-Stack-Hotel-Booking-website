import { HiUser } from "react-icons/hi";

import Modal from "./Modal";
import ToggleWindow from "./ToggleWindow";

function UserToggle() {
  return (
    <>
      <Modal>
        <Modal.Open opens={"user-modal"}>
          <HiUser className="w-12 h-12 mb-2  text-black dark:text-white hidden md:block" />
        </Modal.Open>
        <Modal.Window name={"user-modal"}>
          <ToggleWindow />
        </Modal.Window>
      </Modal>
    </>
  );
}
export default UserToggle;
