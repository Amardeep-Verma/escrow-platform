import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // check token
  const token = localStorage.getItem("token");

  // ❌ Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in → allow access
  return children;
};

export default PrivateRoute;
