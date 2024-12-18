/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

function SideBar({ setIsOpen }) {
  return (
    <div className="flex flex-col fixed right-0 top-0 h-full z-[9999] max-w-96 bg-white p-4 shadow-lg  px-3">
      <div className="text-right mb-3">
        <button onClick={setIsOpen}>✖</button>
      </div>

      <div className="p-7">
        <NavLink to="/" className="text-xl font-black mb-6 text-center px-7">
          ☁ Efoy Rooms
        </NavLink>
      </div>
      <hr className="h-[1px] bg-gray-300 my-3" />
      <NavLink to="/signup" className="mb-2 px-2  font-black">
        <div className="hover:bg-gray-300 rounded p-6">Sign Up</div>
      </NavLink>

      <NavLink to="/login" className="mb-2 px-2  font-black">
        <div className="hover:bg-gray-300 rounded p-6">Log in</div>
      </NavLink>

      <NavLink to="/about" className="mb-2 px-2  font-black">
        <div className="hover:bg-gray-300 rounded p-6">About us</div>
      </NavLink>
    </div>
  );
}

export default SideBar;
