/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function RoomDetail({ room }) {
  const { price, roomImageUrls = [], roomType } = room;

  return (
    <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden mb-8 p-4">
      {/* Images */}
      <div className="flex overflow-x-scroll space-x-4 mb-4">
        {roomImageUrls.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Room ${index + 1}`}
            className="w-64 h-40 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Room Info */}
      <div className="py-2 px-2">
        {/* <h3 className="font-bold text-xl mb-2">{name}</h3> */}
        <p className="text-sm text-gray-500 mb-1">Room Type: {roomType}</p>
        <p className="text-sm text-gray-500 mb-1">Price: ${price}</p>
        <p className="text-sm text-gray-500 mb-1">Rating: ⭐⭐⭐⭐</p>
      </div>

      {/* Booking Link */}
      <Link
        to={`/booking/${room.id}`}
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
      >
        Book Now
      </Link>
    </div>
  );
}

export default RoomDetail;
