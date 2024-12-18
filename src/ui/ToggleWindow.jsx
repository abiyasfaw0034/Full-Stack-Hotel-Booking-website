import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext/authContext";
import DarkButton from "./DarkButton";
import { useModals } from "./Modal";
import { doSignOut } from "../firebase/auth";

function ToggleWindow() {
  const navigate = useNavigate();
  const { close } = useModals();

  const { userLoggedIn } = useAuth();

  const handleNavLinkClick = (path) => {
    // console.log("Closing modal and navigating to:", path);
    close(); // Close the modal
    navigate(path); // Navigate to the specified path
  };
  const handleSignOut = () => {
    doSignOut().then(() => navigate("./login"));
    close();
  };
  return (
    <>
      {!userLoggedIn ? (
        <div className="text-black dark:text-white">
          <div className="grid grid-cols-2 gap-8   mb-3 text-center">
            <NavLink
              to="/signup" // Keep this for routing, but also handle the click
              onClick={() => handleNavLinkClick("/signup")}
              className="hover:text-black hover:cursor-pointer hover:bg-slate-400 p-4 rounded-lg bg-gray-400"
            >
              Sign up
            </NavLink>

            <NavLink
              to="/login" // Keep this for routing, but also handle the click
              onClick={() => handleNavLinkClick("/login")}
              className=" hover:text-black hover:cursor-pointer hover:bg-slate-400 p-4 rounded-lg bg-gray-400 "
            >
              Log in
            </NavLink>
          </div>

          <div className="grid grid-cols-2 gap-12  border-b-2 mt-9 ">
            <div>
              <p>Dark theme</p>
            </div>

            <div className="">
              <DarkButton />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-black dark:text-white ">
          <div>
            <button
              onClick={handleSignOut}
              className="gap-8 bg-gray-400 p-4 rounded-xl w-full mb-3 text-center"
            >
              Log out
            </button>
          </div>

          <div className="grid grid-cols-2 gap-12  border-b-2 mt-9 ">
            <div>
              <p>Dark theme</p>
            </div>
            <div className="">
              <DarkButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ToggleWindow;
