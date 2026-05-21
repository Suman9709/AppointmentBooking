import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

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
    return <h1>Loading...</h1>;
  }

  // not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // wrong role
  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;