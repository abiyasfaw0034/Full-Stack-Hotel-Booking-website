/* eslint-disable no-unused-vars */
import { HiClock, HiOutlineSearch, HiWifi } from "react-icons/hi";
import { MdBreakfastDining } from "react-icons/md";
import { PiSwimmingPoolBold } from "react-icons/pi";
import { useAuth } from "../context/authContext/authContext";
import Hotels from "../features/hotels/Hotels";
function HomePage() {
  // const { currentUser } = useAuth();
  // console.log(currentUser.uid);

  return (
    <>
      <div className="max-w-7xl mx-auto   px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 dark:shadow-2xl  shadow-lg rounded-full flex-wrap sm:flex-nowrap">
          <div className="flex flex-col px-4 sm:w-auto">
            <label className="text-md font-semibold">Where</label>
            <input
              type="text"
              placeholder="Search destinations"
              className="focus:outline-none outline-none transition-transform duration-300 ease-in-out focus:scale-105 dark:bg-gray-800"
            />
          </div>

          {/* Hide these fields on smaller screens */}
          <div className="hidden sm:flex flex-col px-4 border-l border-gray-300">
            <label className="text-md font-semibold">Check in</label>
            <input
              type="text"
              placeholder="Add dates"
              className="focus:outline-none outline-none transition-transform duration-300 ease-in-out dark:bg-gray-800 focus:scale-105"
            />
          </div>
          <div className="hidden sm:flex flex-col pl-4 w-[150px] border-l border-gray-300 ">
            <label className="text-md font-semibold">Check out</label>
            <input
              placeholder="Add dates"
              type="text"
              className="focus:outline-none outline-none transition-transform duration-300 ease-in-out focus:scale-105 dark:bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-center  mt-4 md:mt-0">
            <button className="px-6 py-3 text-white bg-red-500 rounded-full hover:bg-red-600">
              <HiOutlineSearch className="w-8 h-8 " />
            </button>
          </div>
        </div>
        {/* Amenities */}
        <div className="flex justify-center gap-12 mt-4">
          <button className="flex flex-col items-center text-lg text-gray-500 hover:text-black">
            <HiWifi className="w-12 h-12 mb-2 text-gray-500 hover:text-gray-400" />
            WiFi
          </button>

          <button className="flex flex-col items-center text-lg text-gray-500 hover:text-black">
            <HiClock className="w-12 h-12 mb-2 text-gray-500 hover:text-green-200" />
            24-hour reception
          </button>

          <button className="flex flex-col items-center text-lg text-gray-500 hover:text-black">
            <PiSwimmingPoolBold className="w-12 h-12 mb-2 text-gray-500 hover:text-blue-400" />
            Swimming pool
          </button>

          <button className="flex flex-col items-center text-lg text-gray-500 hover:text-black">
            <MdBreakfastDining className="w-12 h-12 mb-2 text-gray-500 hover:text-yellow-200" />
            Breakfast offered
          </button>
        </div>
      </div>
      <Hotels />
    </>
  );
}

export default HomePage;
