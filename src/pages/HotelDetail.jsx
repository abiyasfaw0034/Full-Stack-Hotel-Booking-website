/* eslint-disable react/prop-types */
import { useHotel } from "../features/hotels/useHotel";
import Map from "../ui/Map";
import Spinner from "../ui/Spinner";
import RoomDetail from "../features/hotels/RoomDetail";
import ImageCarousel from "../ui/ImageCarousel";

function HotelDetail() {
  const { hotel, isLoading } = useHotel();

  if (!hotel)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  const { name, rooms = [], imageUrl, description, location } = hotel;
  // console.log(hotel.r);

  if (isLoading) return <Spinner className="relative top-[30%]" />;

  return (
    <div className="grid h-screen grid-col-1 md:grid-cols-2 md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-full px-10">
        <ImageCarousel images={imageUrl} />
        <div className="text-sm sm:text-lg md:text-5xl p-8 font-black">
          {name}
        </div>
        <div className="text-sm sm:text-lg md:text-xl py-2 px-8">
          {description}
        </div>
        <div className="text-sm sm:text-lg md:text-3xl py-2 px-8 font-bold">
          Rooms Available: {rooms.length}
        </div>

        {/* Render RoomDetail for each room */}
        {rooms.map((room, index) => (
          <RoomDetail
            key={index}
            room={{
              id: room.roomId,
              roomType: room.roomType,
              price: room.pricePerNight,
              capacity: room.capacity,
              roomImageUrls: room.images,
            }}
          />
        ))}
      </div>

      {/* Right Side */}
      <div className="w-full hidden md:block md:w-1/2 h-screen md:fixed right-0 p-4 overflow-hidden">
        <Map location={location} />
      </div>
    </div>
  );
}

export default HotelDetail;
