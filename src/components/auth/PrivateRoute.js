import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
/**
 * A component that wraps around routes that require authentication.
 * Redirects to the login page if no user is logged in.
 */
const ProtectedRoute = ({ children }) => {
  const { authData } = useAuth();

  // Check if authData exists which implies a user is logged in
  if (!authData) {
    // Redirect to login page if there's no authData
    return <Navigate to="/login" replace />;
  }

  // If authData is present, render the children components (protected content)
  return children;
};

export default ProtectedRoute;
