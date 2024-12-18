/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { doSignInWithEmailAndPasswrd } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

export function useLogIn() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      doSignInWithEmailAndPasswrd(email, password),
    onSuccess: ({ user, role }) => {
      toast.success("Logged in successfully");

      // Redirect based on user role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    },
    onError: (err) => toast.error(err.message),
  });

  return { login, isLoading };
}
