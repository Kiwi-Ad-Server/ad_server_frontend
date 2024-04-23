import React, { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService";
import AS_LOADER from "../shared/AS_LOADER";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Add state for handling errors

  const validateSession = async () => {
    try {
      const user = await authService.validateSession();
      setAuthData(user);
    } catch (error) {
      // setError(error.message || "Session validation failed");
      setAuthData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  const register = async (formData) => {
    try {
      await authService.register(formData);
      await validateSession();
    } catch (error) {
      setError(error.message || "Registration failed");
      console.error("Register error:", error.message);
      // Consider setting a state here to indicate registration failed
    }
  };

  const login = async (email, password) => {
    try {
      await authService.login(email, password);
      await validateSession();
    } catch (error) {
      setError(error.message || "Login failed");
      console.error("Login error:", error.message);
      // Here, you might want to return or set state to indicate login failure
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setAuthData(null);
    } catch (error) {
      setError(error.message || "Logout failed");
      console.error("Logout error:", error);
      // Optionally handle logout failure (e.g., retry logic)
    }
  };

  if (loading) {
    return <AS_LOADER />;
  }

  return (
    <AuthContext.Provider value={{ authData, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  );
};
