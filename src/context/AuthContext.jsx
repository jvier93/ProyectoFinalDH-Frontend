import { createContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data) => {
    console.log(data);

    setUser(data);

    if (data.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
