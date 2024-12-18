/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignUpAdmin() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    // The mutation function takes the email, password, and additionalData
    mutationFn: ({ email, password, additionalData }) =>
      doCreateUserWithEmailAndPassword({ email, password, additionalData }),
    onSuccess: (user) => {
      toast.success("Admin created successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
}
