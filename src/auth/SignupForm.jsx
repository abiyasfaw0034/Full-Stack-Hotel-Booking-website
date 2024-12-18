/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useSignUp } from "./useSignUp";
import { useSigninGoggle } from "./useSigninGoogle";
import { FcGoogle } from "react-icons/fc";

import styled from "styled-components";
import Button from "../ui/Button";
import SpinnerMini from "../ui/SpinnerMini";
import { useEffect } from "react";
import { useAuth } from "../context/authContext/authContext";
import toast from "react-hot-toast";

function SignupForm2() {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const { signup, isLoading } = useSignUp();
  const { signupGoogle, issigningupwithgoogle } = useSigninGoggle();

  async function onSubmit(data) {
    const { email, password } = data;
    signup({
      email,
      password,
      additionalData: { role: "user" }, // Example additional data
    });
  }

  useEffect(() => {
    // Only show the toast once when the user is logged in
    if (userLoggedIn) {
      toast.success("You are already logged in");
    }
  }, [userLoggedIn]);

  if (userLoggedIn) {
    return <Navigate to="/home" replace={true} />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          {...register("email", { required: "This field is required" })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors?.password?.message}>
        <Input
          type="password"
          disabled={isLoading || issigningupwithgoogle}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Confirm Password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          disabled={isLoading || issigningupwithgoogle}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRowVertical>
      <div
        className="text-right gap-y-7 hover:text-blue-300 cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Already have an account? Log in
      </div>
      {/* </div> */}
      <FormRowVertical>
        <Button size="large" className="hover:bg-gray-400">
          {isLoading || issigningupwithgoogle ? <SpinnerMini /> : "Sign up"}
        </Button>
      </FormRowVertical>

      <FormRowVertical>
        <Button
          size="large"
          className="hover:bg-gray-400"
          variation="google"
          onClick={signupGoogle}
        >
          {isLoading || issigningupwithgoogle ? (
            <SpinnerMini />
          ) : (
            <FcGoogle className="w-12 h-12 relative left-[45%]" />
          )}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignupForm2;
const Input = styled.input`
  border: 1px solid var(--color-grey-600);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
`;
const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1.2rem 0;
`;
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
const Form = styled.form`
  padding: 2.4rem 4rem;

  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`;
