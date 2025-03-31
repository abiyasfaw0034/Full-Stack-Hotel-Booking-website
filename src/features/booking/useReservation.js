import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext/authContext";
import { getBooking } from "../../services/apiBooking";

export function useReservation() {
  const { currentUser } = useAuth();
  const id = currentUser?.uid;

  const { data, isLoading } = useQuery({
    queryKey: ["reservations", id], // Include user ID in query key for caching
    queryFn: () => getBooking(id),
    enabled: !!id, // Ensures query only runs if user ID exists
  });

  return { data, isLoading };
}
