import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavBarAdmin";
import SideBarAdmin from "../admin/ui/SideBarAdmin";

function ApplayoutAdmin() {
  return (
    <>
      <div className="grid h-screen overflow-hidden grid-rows-[auto,1fr] grid-cols-[auto,1fr] text-black dark:text-white bg-white dark:bg-black">
        {/* Sidebar */}
        <div
          className="row-span-full w-[25rem] bg-gray-100 dark:bg-black border-r border-r-gray-200 dark:border-r-gray-700"
          id="sidebar"
        >
          <SideBarAdmin />
        </div>

        {/* Navbar */}
        <div className="bg-gray-100 dark:bg-gray-800">
          <NavbarAdmin />
        </div>

        {/* Main Content */}
        <div className="overflow-y-scroll  bg-gray-200 dark:bg-gray-900">
          <main className="mx-auto h-full p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default ApplayoutAdmin;
