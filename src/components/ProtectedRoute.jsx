// src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Retrieve the user's role from localStorage
  const userRole = JSON.parse(localStorage.getItem("user"))?.role;

 
  if (userRole !== "admin") {
    // Redirect to home page if the user is not an admin
    return <Navigate to="/" replace />;
  }

  // Render children components if user is an admin
  return children;
};

export default ProtectedRoute;
