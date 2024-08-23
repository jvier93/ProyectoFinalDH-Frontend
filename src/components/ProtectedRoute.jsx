import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  // READ!
  // When logging out, the `AuthProvider` context is updated, which causes a re-render of this component since it uses `useAuth`.
  // Without `useEffect`, this logout action execute before the component has finished its initial render.
  // This can lead to errors or unintended behavior.
  // `useEffect` ensures that these side effects are handled after the initial render, avoiding interference with the rendering process.

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (isTokenExpired(user.token)) {
      Swal.fire({
        icon: "warning",
        html: `
          <p class="text-sm text-gray-500 text-center font-Inter">
              Tu sesión ha expirado, seras redirigido a la pantalla de login.
          </p>
        `,
        confirmButtonColor: "#33B8AD",
      });

      logout();
    }
  }, [user, logout, navigate]);

  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  };

  //if the user is either not logged in or their token is expired, don't render anything (return null).
  if (!user || isTokenExpired(user.token)) {
    return null;
  }

  //Verify if user has the required role to access the route
  //by default requiredRole is null
  if (requiredRole && user.roles[0] !== requiredRole) {
    return <Navigate to="/login" />;
  }
  return children;
};
