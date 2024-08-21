import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  //If the token is expired or invalid, it returns true.
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  };

  const { user } = useAuth();

  // Verify if the user exists and if their token is still valid
  //we need to evaluates both in the same if
  if (!user || isTokenExpired(user.token)) {
    return <Navigate to="/login" />;
  }

  //Verify if user has the required role to access the route
  //by default requiredRole is null
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" />;
  }
  return children;
};
