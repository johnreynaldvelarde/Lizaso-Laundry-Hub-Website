import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Adjust the import as needed

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state while checking token
  }

  return accessToken ? <Component {...rest} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
