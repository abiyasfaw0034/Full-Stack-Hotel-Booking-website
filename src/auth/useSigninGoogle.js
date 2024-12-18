/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { doSignInWithGoogle } from "../firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSigninGoggle() {
  const navigate = useNavigate();
  const { mutate: signupGoogle, isLoading: issigningupwithgoogle } =
    useMutation({
      mutationFn: doSignInWithGoogle,
      onSuccess: (user) => {
        toast.success("Account created succesfully");
        navigate("/home");
      },
      onError: (err) => toast.error(err.message),
    });

  return { signupGoogle, issigningupwithgoogle };
}
