/* eslint-disable no-unused-vars */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure you import the CSS for styling
import Button from "../ui/Button";
import { useBooking } from "../features/booking/useBooking";
import { useNavigate, useParams } from "react-router-dom";
import { useHotel } from "../features/hotels/useHotel";
import Spinner from "../ui/Spinner";
import { useAuth } from "../context/authContext/authContext";
import toast from "react-hot-toast";

function Booking() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numOfGuests, setNumOfGuests] = useState("");

  const { roomId } = useParams(); // Get roomId from URL
  const { hotel, isLoading } = useHotel(); // Fetch hotel data from useHotel hook
  const { id, rooms = [] } = hotel;

  const { currentUser, userLoggedIn } = useAuth();
  const { addBooking, isLoading: isAdding } = useBooking();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ensure no time part

  if (isLoading || !hotel) return <Spinner className="relative top-[30%]" />;

  // Find the room matching the roomId from URL
  const room = rooms.find((room) => room.roomId === roomId);
  const { roomType, pricePerNight, capacity, images, amenities } = room;

  function handleSubmit(e) {
    e.preventDefault();
    if (!checkInDate || !checkOutDate || !numOfGuests || !fullName) return;
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      return toast.error("Check-out date must be after check-in date");
    }
    if (userLoggedIn) {
      //fx it hen u add authentication in the last part
      addBooking({
        fullName,
        startDate: checkInDate,
        endDate: checkOutDate,
        numGuests: numOfGuests,
        roomPrice: pricePerNight,
        userId: currentUser.uid,
        roomId,
        hotelId: id,
      });
      setFullName("");
      setCheckInDate(null);
      setCheckOutDate(null);
      setNumOfGuests("");
    } else {
      navigate("/login");
      toast.error("you are not logged in");
    }
  }

  if (!room) {
    return (
      <div className="text-center text-xl">
        <p>Room not found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* Left part: Room images and description */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        {/* Room Images in Grid */}
        <div className="grid   gap-2 mb-6">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Room image ${index + 1}`}
              className="w-full h-72 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Room Amenities */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-gray-700 dark:text-gray-300">
          <h2 className="text-3xl font-bold mb-4 border-b pb-2">
            Room Details
          </h2>

          <div className="space-y-3">
            <p className="text-2xl">
              <span className="font-semibold text-gray-900 dark:text-gray-200">
                Type:
              </span>{" "}
              {roomType}
            </p>
            <p className="text-2xl">
              <span className="font-semibold text-gray-900 dark:text-gray-200">
                Price per Night:
              </span>
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {" "}
                ${pricePerNight}
              </span>
            </p>
            <p className="text-2xl">
              <span className="font-semibold text-gray-900 dark:text-gray-200">
                Capacity:
              </span>{" "}
              {capacity} people
            </p>
          </div>

          {amenities && amenities.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">
                Amenities:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                {amenities.map((amenity, index) => (
                  <li key={index} className="pl-2">
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right part: Booking form */}
      <form
        className="mt-6 md:mt-16 p-8 md:p-12 bg-white dark:bg-gray-700 shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-7 p-4">
          <div>
            <label
              htmlFor="fullName"
              className="text-gray-700 dark:text-gray-300 font-semibold"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              disabled={isAdding}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="checkInDate"
                className="text-gray-700 dark:text-gray-300 font-semibold "
              >
                Check In
              </label>
              <DatePicker
                id="checkInDate"
                disabled={isAdding}
                onChange={(date) => {
                  setCheckInDate(date);
                  setCheckOutDate(null); // Reset check-out date if check-in changes
                }}
                selected={checkInDate}
                required
                dateFormat="dd/MM/yyyy"
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 w-full"
                placeholderText="Select a date"
                minDate={today} // Prevent selecting past dates
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="checkOutDate"
                className="text-gray-700 dark:text-gray-300 font-semibold"
              >
                Check Out
              </label>
              <DatePicker
                id="checkOutDate"
                disabled={isAdding || !checkInDate}
                onChange={(date) => setCheckOutDate(date)}
                selected={checkOutDate}
                required
                dateFormat="dd/MM/yyyy"
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 w-full"
                placeholderText="Select a date"
                minDate={checkInDate || today} // Check-out must be after check-in
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="numGuests"
              className="text-gray-700 dark:text-gray-300 font-semibold"
            >
              Number of Guests
            </label>
            <input
              type="number"
              id="numGuests"
              min="1"
              disabled={isAdding}
              required
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 w-full"
            />
          </div>

          <div>
            <Button
              size="large"
              className="hover:bg-gray-400 w-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-white"
            >
              {isAdding ? "Reserving..." : "Reserve"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Booking;
