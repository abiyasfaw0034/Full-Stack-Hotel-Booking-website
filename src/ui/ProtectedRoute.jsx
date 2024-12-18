/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../auth/useUser";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1, load authenticated user
  const { user, isAuthenticated, isLoading } = useUser();

  // 2, redirect to login if not authenticated

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3, load the spinner
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  // 4, if there is render app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
