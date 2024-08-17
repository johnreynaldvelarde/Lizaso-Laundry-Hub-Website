// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, auth }) => {
  return auth ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;
