/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/authContext";
import Spinner from "../../ui/Spinner";

function AdminRoute({ children }) {
  const { role, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (!role || role !== "admin") {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export default AdminRoute;
