import { useState } from "react";
import { doViewHotel } from "../../services/apiViewHotels";
import Spinner from "../../../ui/Spinner";

function ViewHotels() {
  const [hotelName, setHotelName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setHotelName(e.target.value);
  };

  // Fetch hotel when button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hotelName.trim()) {
      setData([]);
      setIsLoading(true); // Start loading
      setIsError(false); // Reset error state

      try {
        const hotelImages = await doViewHotel(hotelName); // Fetch hotel data
        setData(hotelImages); // Set fetched images
      } catch (error) {
        console.error("Error fetching hotel:", error);
        setIsError(true); // Set error state on failure
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      console.error("Hotel name cannot be empty");
    }
  };

  return (
    <div className="p-10 h-screen">
      <div className="grid grid-cols-3 border-b border-b-gray-400">
        <div className="px-4 text-5xl font-black my-5 ">View Hotels</div>
        <div className="w-full  col-span-2 flex justify-end items-center">
          <form onSubmit={handleSubmit} className="flex gap-5">
            <input
              type="text"
              placeholder="Enter hotel name"
              value={hotelName}
              onChange={handleInputChange}
              className="focus:outline-none p-3 rounded "
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 rounded hover:bg-blue-600 transition duration-300"
            >
              View Hotel Images
            </button>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <Spinner />
        </div>
      )}
      {isError && (
        <p className="text-center">Error fetching images. Please try again.</p>
      )}
      {data && <div className="grid grid-cols-2 gap-4 mt-4">{data.email}</div>}
    </div>
  );
}

export default ViewHotels;
{
  /* <div className="p-10 rounded-lg h-screen">
//       <div className="grid grid-cols-2 ">
//         <div className="px-4 text-5xl font-black my-5">View Hotels</div>
//         <div className="flex justify-center items-center gap-5 px-4 sm:w-auto bg-gray-100">
//           <label className="text-md font-semibold p-10">Search hotel</label> */
}
//           <input
//             type="text"
//             placeholder="Hotel name"
//             className="focus:outline-none  p-5 outline-none rounded transition-transform duration-300 ease-in-out focus:scale-105 dark:bg-gray-800"
//           />
//         </div>
//       </div>
//       <hr className="h-[2px] bg-gray-300 dark:bg-gray-900 mb-3 px-5" />
//       <Hotels />
//     </div>
