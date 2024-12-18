/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuth } from "../context/authContext/authContext";
import { HiUser } from "react-icons/hi";
import { doSignOut } from "../firebase/auth";
import SideBar from "./SideBar";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import DarkButton from "./DarkButton";
import UserToggle from "./UserToggle";
import Modal from "./Modal";

function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="backdrop-blur-md dark:bg-black w-full h-[15vh] flex justify-around items-center px-10  top-0 z-[1000] shadow-md">
      <div className={styles.logo}>
        <NavLink to="/" className="text-black dark:text-white">
          progress in how this should end
        </NavLink>
      </div>
      <ul className={styles.navLinks}>
        <li className="hidden md:block text-black dark:text-white">
          <NavLink to="/about">Wait a sec</NavLink>
        </li>

        <li>
          <Modal>
            <UserToggle />
          </Modal>
        </li>

        <li className="hidden md:block text-black dark:text-white ">
          <NavLink to="/aboutAdmin">About Us</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarAdmin;
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
