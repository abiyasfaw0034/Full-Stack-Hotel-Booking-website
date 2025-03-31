/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import ImageCarousel from "../../ui/ImageCarousel";

function RoomDetail({ room }) {
  const { hotelId } = useParams();

  const { price, roomImageUrls = [], roomType, id, capacity } = room;

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-gray-100 text-black shadow-lg rounded-lg overflow-hidden p-6">
      {/* Room Images Carousel */}
      <div className="mb-4">
        {roomImageUrls.length > 0 ? (
          <ImageCarousel images={roomImageUrls} />
        ) : (
          <div className="w-full h-48 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Room Info */}
      <div className="mb-4">
        <p className="text-md font-bold">Room Type: {roomType}</p>
        <p className="">Price: ${price}</p>
        <p className="">Capacity: {capacity} person(s)</p>
      </div>

      {/* Book Now Button */}
      <Link
        to={`/hotel/${hotelId}/room/${id}`}
        className="block text-center px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 transition-colors"
      >
        Book Now
      </Link>
    </div>
  );
}

export default RoomDetail;
