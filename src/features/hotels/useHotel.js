/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getHotel } from "../../services/apiHotels";
import { useParams } from "react-router-dom";

export function useHotel() {
  const { hotelId } = useParams();

  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getHotel(hotelId),
    queryKey: ["hotel", hotelId],
  });

  return { hotel, isLoading };
}
