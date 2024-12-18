import { useQuery } from "@tanstack/react-query";
import { getHotels } from "../../services/apiHotels";

export function useHotels() {
  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery({
    queryFn: getHotels,
    queryKey: ["hotels"],
  });

  return { hotels, isLoading, error };
}
