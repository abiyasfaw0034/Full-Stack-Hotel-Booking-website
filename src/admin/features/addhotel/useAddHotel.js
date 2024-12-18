/* eslint-disable no-unused-vars */
// import doAddHotel from "./doAddHotel";
import toast from "react-hot-toast";
import doAddHotel from "../../services/apiAddHotel";
import { useMutation } from "@tanstack/react-query";

export function useAddHotel() {
  const { mutate: addhotel, isLoading } = useMutation({
    mutationFn: (hotelData) => doAddHotel(hotelData),
    onSuccess: (user) => {
      toast.success("Hotel added successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addhotel, isLoading };
}

// export default useAddHotel;
