import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavBarAdmin";
// grid h-screen overflow-hidden  grid-rows-[auto,1fr] text-black dark:text-white bg-white dark:bg-black"

// grid-template-columns: 26rem 1fr;
// grid-template-rows: auto 1fr;
function ApplayoutAdmin() {
  return (
    <>
      <div className="grid h-screen overflow-hidden  grid-rows-[auto,1fr] grid-cols-[auto,1fr] text-black dark:text-white bg-white dark:bg-black">
        <div className="row-span-full" id="sidebar">
          sidebar
        </div>
        <div>
          <NavbarAdmin />
        </div>

        <div className="overflow-y-scroll">
          <main className="mx-auto h-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default ApplayoutAdmin;
