// Custom Hook for fetching the hotel data
import { useQuery } from "@tanstack/react-query";
import { doViewHotel } from "../../services/apiViewHotels";

export function useViewHotel(hotelName) {
  return useQuery({
    queryKey: ["viewhotel", hotelName],
    queryFn: () => doViewHotel(hotelName),
    enabled: false, // Disable automatic fetch
    refetchOnWindowFocus: false, // Prevent refetch when window regains focus
    refetchOnMount: false, // Prevent refetch when component remounts
    refetchOnReconnect: false, // Prevent refetch when network reconnects
  });
}
