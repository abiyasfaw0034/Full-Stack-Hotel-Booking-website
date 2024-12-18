import { useMutation } from "@tanstack/react-query";
import { doDeleteHotel } from "../../services/apiDeleteHotel";
import toast from "react-hot-toast";

export function useDeleteHotel() {
  return useMutation({
    mutationFn: (hotelName) => doDeleteHotel(hotelName),
    onSuccess: () => {
      toast.success("Hotel deletion successful");
      // Add any success actions, like refetching data or showing a notification
    },
    onError: (error) => {
      toast.error("Error deleting hotel:", error);
      // Handle error scenarios (e.g., show an error message to the user)
    },
  });
}
