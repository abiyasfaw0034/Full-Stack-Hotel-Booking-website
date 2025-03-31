/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useHotel } from "../features/hotels/useHotel";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";

function BigRoomDetail() {
  const { roomId } = useParams(); // Get roomId from URL
  const { hotel, isLoading } = useHotel(); // Fetch hotel data from useHotel hook

  if (isLoading || !hotel) return <Spinner className="relative top-[30%]" />;

  const {
    name,
    rooms = [],
    imageUrl,
    description,
    location,
    contactNumber,
    email,
    id,
  } = hotel;

  // Find the room matching the roomId from URL
  const room = rooms.find((room) => room.roomId === roomId);

  if (!room) {
    return (
      <div className="text-center text-xl">
        <p>Room not found.</p>
      </div>
    );
  }

  // Extract room and hotel data
  const {
    roomType,
    pricePerNight,
    roomImageUrls = [],
    capacity,
    images,
  } = room;
  console.log(images.length);
  return (
    <div className="grid h-screen md:grid-cols-2 md:grid-rows-1 dark:bg-gray-900 dark:text-gray-100">
      {/* Left Side - Hotel Image and Description */}
      <div className="w-full px-4 md:px-10 py-6">
        {/* Combine hotel images and room-specific images */}
        <ImageCarousel images={[...imageUrl, ...images]} />
        <div className="text-3xl font-bold mt-4">{name}</div>
        <div className="text-lg mt-2 leading-relaxed">{description}</div>
      </div>

      {/* Right Side - Room Details */}
      <div className="h-full p-6 md:p-10 bg-gray-50 dark:bg-gray-800 flex flex-col">
        <div className="grid  gap-4 mb-6">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Room ${index + 1}`}
              className="w-full h-72 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
        <div className="flex justify-between mt-20">
          <div className="text-4xl font-bold mb-6">{roomType}</div>
          <div>
            <div className="text-2xl font-semibold mb-4">
              Price: <span className="text-green-500">${pricePerNight}</span>{" "}
              per night
            </div>
            <div className="text-lg mb-4">Capacity: {capacity} people</div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <div className="text-xl mt-4">
            <strong>Phone:</strong>{" "}
            <a
              href={`tel:${contactNumber}`}
              className="text-blue-500 hover:underline"
            >
              {contactNumber}
            </a>
          </div>
          <div className="text-xl mt-2">
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${email}`}
              className="text-blue-500 hover:underline"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="mt-6">
          {/* Reserve Now button */}
          <Link to={`/hotel/${id}/room/${roomId}/booking`}>
            <button className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors w-full">
              Reserve Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BigRoomDetail;
