// import { useHotels } from "./useHotels";

import { useHotels } from "../../features/hotels/useHotels";
import Spinner from "../../ui/Spinner";
import Hotel from "../hotels/Hotel";

function Hotels() {
  const { hotels, isLoading, error } = useHotels();

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error loading hotels</div>;

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 px-10 mt-4">
      {hotels && hotels.length > 0 ? (
        hotels.map((hotel) => <Hotel hotel={hotel} key={hotel.id} />)
      ) : (
        <div className="text-center text-lg mt-[50%]">No hotels found</div>
      )}
    </div>
  );
}

export default Hotels;
