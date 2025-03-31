/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

function Hotel({ hotel }) {
  const { name, imageUrl, id, location } = hotel;
  // const { address, amenities, city, contactNumber, country, description, email, hotelId, imageUrl, location, name, rating, ...rest } = hotel;

  // This will create variables for each property name but not their corresponding values
  const { _lat, _long } = location;

  const showitem = imageUrl.at(0);

  return (
    <Link to={`/hotel/${id}?lat=${_lat}&lng=${_long}`}>
      <div className="gap-y-2 rounded-t-md glow-effect text-white z-0 rounded-md  transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-300">
        <div className="mb-4">
          <img
            src={showitem}
            className="w-full h-32 sm:h-48 lg:h-72 object-cover rounded-t-md"
          />
        </div>
        <div className="py-3 px-3 text-gray-400 text-sm sm:text-3xl md:text-4xl">
          {name}
        </div>
        <div className="mb-2 py-3 px-3 text-gray-400 text-sm sm:text-2xl md:text-3xl">
          Rating: ⭐⭐⭐⭐
        </div>
      </div>
    </Link>
  );
}

export default Hotel;
