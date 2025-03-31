/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBooking as addBookingApi } from "../../services/apiBooking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: addBooking, isLoading } = useMutation({
    mutationFn: ({
      fullName,
      startDate,
      endDate,
      numGuests,
      roomPrice,
      userId,
      roomId,
      hotelId,
    }) =>
      addBookingApi({
        fullName,
        startDate,
        endDate,
        numGuests,
        roomPrice,
        userId,
        roomId,
        hotelId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("reservations"); // Invalidate reservations query when there will be reservations
      // navigate("/reservations")
      //   also route to reservations to make the user see his reservation
      toast.success("Room booked succesfuly, go check out in reservations");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addBooking, isLoading };
}
