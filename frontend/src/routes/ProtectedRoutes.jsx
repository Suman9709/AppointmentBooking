import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Loader from "../Components/Loader";

const ProtectedRoutes = ({
  children,
  allowedRole,
}) => {

  const {
    loading,
    isAuthenticated,
    role
  } = useAuth();

  // wait until auth check completes
  if (loading) {
    return <Loader label="Checking your session..." fullPage />;
  }

  // not logged in
  if (!isAuthenticated) {
    return <Navigate to={`/${allowedRole}login`} replace />;
  }

  // wrong role
  if (role !== allowedRole) {
    return <Navigate to={`/${allowedRole}login`} replace />;
  }

  return children;
};

export default ProtectedRoutes;
