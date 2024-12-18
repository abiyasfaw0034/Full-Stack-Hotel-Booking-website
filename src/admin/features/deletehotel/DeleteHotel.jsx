/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDeleteHotel } from "./useDeleteHotel";
import { doViewHotel } from "../../services/apiViewHotels";
import Spinner from "../../../ui/Spinner";

function DeleteHotel() {
  const [hotelName, setHotelName] = useState("");
  const { mutate: deleteHotel, isLoading: isDeleting } = useDeleteHotel();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false); // New state for confirmation dialog

  const handleCancel = () => {
    setData(null);
  };

  const handleDelete = () => {
    if (!hotelName) {
      alert("Please enter a hotel name");
      return;
    }
    deleteHotel(hotelName);
    setData(null); // Clear data after deletion
  };

  // Handle input change
  const handleInputChange = (e) => {
    setHotelName(e.target.value);
  };

  // Fetch hotel when button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hotelName.trim()) {
      setData(null);
      setIsLoading(true); // Start loading
      setIsError(false); // Reset error state

      try {
        const hotelData = await doViewHotel(hotelName); // Fetch hotel data
        setData(hotelData); // Set fetched data
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

  if (isDeleting)
    return (
      <div className="flex justify-center items-center mt-4">
        <Spinner />
      </div>
    );
  return (
    <div className="p-10 h-screen">
      <div className="grid grid-cols-3 border-b border-b-gray-400">
        <div className="px-4 text-5xl font-black my-5">Delete Hotel</div>
        <div className="w-full col-span-2 flex justify-end items-center">
          <form onSubmit={handleSubmit} className="flex gap-5">
            <input
              type="text"
              placeholder="Enter hotel name"
              value={hotelName}
              onChange={handleInputChange}
              className="focus:outline-none p-3 rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 rounded hover:bg-blue-600 transition duration-300"
            >
              View Hotel Information
            </button>
            <button
              onClick={handleCancel}
              className="bg-blue-500 text-white px-5 rounded hover:bg-blue-600 transition duration-300"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      {(isLoading || isDeleting) && (
        <div className="flex justify-center items-center mt-4">
          <Spinner />
        </div>
      )}

      {isError && (
        <p className="text-center py-28 text-3xl font-black">
          Error fetching hotel information. Please try again.
        </p>
      )}
      {data ? (
        <Hotel
          data={data}
          onDelete={() => setIsConfirmDelete(true)} // Trigger confirmation dialog
        />
      ) : (
        !isLoading &&
        !isError && (
          <div className="text-center font-black text-3xl p-10">
            No selected hotel
          </div>
        )
      )}
      {isConfirmDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this hotel?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  handleDelete();
                  setIsConfirmDelete(false); // Close confirmation dialog
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsConfirmDelete(false)}
                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteHotel;

function Hotel({ data, onDelete }) {
  const { name, email, hotelImageUrls, facilities, rooms } = data;
  return (
    <div className="bg-white dark:bg-gray-700 text-black dark:text-white  shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-3xl font-bold mb-4">{name}</h2>
      <p className="text-lg mb-4">{email}</p>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Facilities:</h3>
        {facilities?.length > 0 ? (
          <ul className="list-disc list-inside">
            {facilities.map((item) => (
              <li key={item} className="">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p>No facilities available</p>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Hotel Images:</h3>
        {hotelImageUrls && hotelImageUrls?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {hotelImageUrls.map((image) => (
              <img
                src={image}
                key={image}
                alt="Hotel"
                className="w-full h-48 object-cover rounded"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hotel images found</p>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Rooms:</h3>
        {rooms && rooms?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <h4 className="text-lg font-medium">Type: {room.roomType}</h4>
                <p className="">Price: ${room.price}</p>
                <div className="mt-2">
                  {room.roomImageUrls && room?.roomImageUrls?.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {room.roomImageUrls.map((url, idx) => (
                        <img
                          src={url}
                          alt={`Room Image ${idx + 1}`}
                          key={idx}
                          className="w-full h-32 object-cover rounded"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No room images available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No rooms available</p>
        )}
      </div>
      <div className="text-end px-24 py-20 border-b border-b-gray-400">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white  py-5 rounded hover:bg-red-600 px-10"
        >
          Delete Hotel
        </button>
      </div>
    </div>
  );
}
