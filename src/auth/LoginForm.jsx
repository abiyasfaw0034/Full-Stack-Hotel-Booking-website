/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import FormRowVertical from "../ui/FormRowVertical";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext/authContext";
import { doSignInWithEmailAndPasswrd } from "../firebase/auth";
import { useLogIn } from "./useLogIn";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";
// import { useLogin } from "./useLogin";
// import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, login } = useLogIn();

  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }
  // useEffect(() => {
  //   // Only show the toast once when the user is logged in
  //   if (userLoggedIn) {
  //     toast.success("You are already logged in");
  //   }
  // }, [userLoggedIn]);

  if (userLoggedIn) {
    return <Navigate to="/home" replace={true} />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          placeholder="asdf@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="asdfasdf"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <div
        className="text-right gap-y-7 hover:text-blue-300"
        onClick={() => navigate("/signup")}
      >
        Don&apos;t have an account? Sign up
      </div>
      <FormRowVertical>
        <Button size="large" variation="dark" disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
