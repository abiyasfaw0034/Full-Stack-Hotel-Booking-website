/* eslint-disable no-unused-vars */
import styled from "styled-components";
import LoginForm from "../auth/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import SignupForm from "./SignupForm-v2";
import SignupForm2 from "./SignupForm";

const SignUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 1.2rem;
  background-color: var(--color-grey-50);
  /* margin-top: 3%; */
`;

function SignUp() {
  return (
    <SignUpLayout>
      {/* <Logo /> */}
      <Heading as="h4">Sign Up</Heading>
      <SignupForm2 />
    </SignUpLayout>
  );
}
export default SignUp;
