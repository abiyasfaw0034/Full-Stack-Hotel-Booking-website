/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

import styles from "./Navbar.module.css";
import SideBar from "./SideBar";
import UserToggle from "./UserToggle";
import Modal from "./Modal";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" dark:bg-black w-full h-[11vh] flex justify-around items-center  top-0 z-0 shadow-md">
      <div className={styles.logo}>
        <NavLink to="/" className="text-black dark:text-white">
          ☁ Maderia
        </NavLink>
      </div>
      <ul className={styles.navLinks}>
        <li className="hidden md:block text-black dark:text-white">
          <NavLink to="/reservation">Reservations</NavLink>
        </li>

        <li>
          <Modal>
            <UserToggle />
          </Modal>
        </li>
        <li className="hidden md:block text-black dark:text-white ">
          <NavLink to="/about">About Us</NavLink>
        </li>

        <li className="md:hidden ">
          {isOpen ? (
            <IoMenu
              className="w-12 h-12 text-black dark:text-white"
              onClick={(on) => setIsOpen(!on)}
            />
          ) : (
            <SideBar setIsOpen={toggleSidebar} isOpen={isOpen} />
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
// {userLoggedIn ? (
//   <HiUser
//     className="w-12 h-12 mb-2  text-black dark:text-white hidden md:block"
//     onClick={() => doSignOut().then(() => navigate("./login"))}
//   />
// ) : (
//   <li className="hidden md:block text-black dark:text-white">
//     <NavLink to="/login">Login</NavLink>
//   </li>
// )}
