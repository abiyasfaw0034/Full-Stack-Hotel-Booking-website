/* eslint-disable react/prop-types */
import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/authContext/authContext";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { userLoggedIn, isLoading, role } = useAuth(); // Use 'useAuth' here

  // 1. Redirect if the user is not authenticated
  useEffect(() => {
    if (!userLoggedIn && !isLoading) {
      navigate("/login"); // Redirect to login if not authenticated
    }

    // 2. Optionally, check the role if needed (e.g., restrict only to "user" role)
    // if (userLoggedIn && role !== "user") {
    //   navigate("/home"); // Redirect to home if the role is not "user"
    // }
  }, [userLoggedIn, isLoading, role, navigate]);

  // 3. Display loading spinner while checking authentication
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. If authenticated, render the children
  if (userLoggedIn && role === "user") {
    return children;
  }

  // Return null or a fallback if authentication/role doesn't match
  return null;
}

export default ProtectedRoute;
