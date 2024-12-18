/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { isUserAuthenticated } from "../services/apiAuth";

export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: isUserAuthenticated, // This calls the Firebase authentication check
  });

  return { user, isLoading, isAuthenticated: !!user }; // Check if user is truthy for authentication
}
