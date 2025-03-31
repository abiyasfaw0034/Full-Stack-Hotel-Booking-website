import { useReservation } from "../features/booking/useReservation";

function Reservation() {
  const { data: reservations, isLoading } = useReservation();

  if (isLoading)
    return <div className="text-center p-20">Loading reservations...</div>;

  if (!reservations || reservations.length === 0)
    return <div className="text-center p-20">No reservations found.</div>;

  return (
    <div className="p-10">
      <h2 className="text-center text-3xl font-bold my-10">
        Your Reservations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold">{reservation.fullName}</h3>
            <p className="text-gray-600">Hotel: {reservation.hotelName}</p>
            <p className="text-gray-600">Room: {reservation.roomType}</p>
            <p className="text-gray-600">Guests: {reservation.numGuests}</p>
            <p className="text-gray-600">
              Check-in:{" "}
              {new Date(
                reservation.startDate.seconds * 1000
              ).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Check-out:{" "}
              {new Date(
                reservation.endDate.seconds * 1000
              ).toLocaleDateString()}
            </p>
            <p className="text-gray-700 font-bold mt-2">
              Price: ${reservation.roomPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reservation;
