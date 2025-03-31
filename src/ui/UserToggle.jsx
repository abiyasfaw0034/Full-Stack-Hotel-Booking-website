import { HiUser } from "react-icons/hi";

import Modal from "./Modal";
import ToggleWindow from "./ToggleWindow";
import { FaRegUserCircle } from "react-icons/fa";

function UserToggle() {
  return (
    <>
      <Modal>
        <Modal.Open opens={"user-modal"}>
          {/* <HiUser className="w-12 h-12 mb-2  text-black dark:text-white hidden md:block" /> */}

          <FaRegUserCircle className="w-12 h-12  hidden md:block" />
        </Modal.Open>
        <Modal.Window name={"user-modal"}>
          <ToggleWindow />
        </Modal.Window>
      </Modal>
    </>
  );
}
export default UserToggle;
