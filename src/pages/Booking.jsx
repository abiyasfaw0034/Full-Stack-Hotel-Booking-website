/* eslint-disable no-unused-vars */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure you import the CSS for styling
import Button from "../ui/Button";
import { useBooking } from "../features/booking/useBooking";
import { useParams } from "react-router-dom";
import { useHotel } from "../features/hotels/useHotel";
import Spinner from "../ui/Spinner";
import { useAuth } from "../context/authContext/authContext";
import toast from "react-hot-toast";

function Booking() {
  const [fullName, setFullName] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numOfGuests, setNumOfGuests] = useState("");

  function handlesubmit(e) {
    e.preventDefault();
    if (!checkInDate || !checkOutDate || !numOfGuests || !fullName) return;
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      return toast.error("Check-out date must be after check-in date");
    }
    if (userLoggedIn) {
      addBooking({
        fullName,
        startDate: checkInDate,
        endDate: checkOutDate,
        numGuests: numOfGuests,
        roomPrice: 200,
        userId: currentUser.uid,
        roomId: 123,
        hotelId: 142,
      });
      setFullName("");
      setCheckInDate(null);
      setCheckOutDate(null);
      setNumOfGuests("");
    }
  }

  // you have to get the specific room id to add to the room price
  const { currentUser, userLoggedIn } = useAuth();
  const { addBooking, isLoading: isAdding } = useBooking();
  // const { hotel, isLoading } = useHotel(); when the route is correct
  // if (isLoading) return <Spinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-[15dvh] gap-4 h-full">
      <div className="bg-gray-300 h-full">
        any photo of the room goes in here
        <br />
        including description of the rooms (wifi, swimming, ....)
      </div>
      {/* flex flex-col */}
      <form className="mt-6 md:mt-16 p-8 md:p-12 " onSubmit={handlesubmit}>
        <div className="grid gap-7 p-4 bg-white shadow-md md:shadow-lg rounded-lg">
          <div className="">
            <label htmlFor="date" className="text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              disabled={isAdding}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
            />
          </div>

          <div className="grid grid-cols-2 mt-4">
            <div>
              <div htmlFor="date" className="text-gray-700 font-semibold">
                Check in
              </div>
              <DatePicker
                id="date"
                disabled={isAdding}
                onChange={(date) => setCheckInDate(date)}
                selected={checkInDate}
                required
                dateFormat="dd/MM/yyyy" // Change to dd/MM/yyyy for better formatting
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
                placeholderText="Select a date"
              />
            </div>
            <div>
              <div htmlFor="date" className="text-gray-700 font-semibold">
                Check out
              </div>
              <DatePicker
                id="date"
                required
                disabled={isAdding}
                onChange={(date) => setCheckOutDate(date)}
                selected={checkOutDate}
                dateFormat="dd/MM/yyyy" // Change to dd/MM/yyyy for better formatting
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
                placeholderText="Select a date"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-gray-700 font-semibold">Number of Guests</div>
            <input
              type="number"
              min="0"
              disabled={isAdding}
              required
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
            />
          </div>

          <div className="mt-4">
            <Button
              size="large"
              className="hover:bg-gray-400 w-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-white"
              // $variations="google"
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
