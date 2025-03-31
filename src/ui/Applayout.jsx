import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Applayout() {
  return (
    <>
      <div className="grid h-screen overflow-hidden  grid-rows-[auto,1fr] text-black dark:text-white bg-white dark:bg-black">
        {/* <div> */}
        {/* grid-rows-[auto,1fr, auto] */}
        <Navbar />
        {/* </div> */}

        <div className="overflow-y-scroll">
          <main className="mx-auto h-full">
            <Outlet />
          </main>
        </div>
        {/* <footer className="h-30 text-center py-5">@copyright Efoy rooms</footer> */}
      </div>
    </>
  );
}

export default Applayout;
