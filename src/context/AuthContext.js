import React, { createContext, useState, useContext, useCallback } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  const login = useCallback(async (email, password) => {
    const response = await authService.login(email, password); // authService needs to be adjusted accordingly
    const data = response.data;

    setAuthData({
      token: data.token,
      user: data.user, // This now includes the role
    });

    // Consider storing the token in HTTP-only cookies if security is a concern and you're adjusting backend to support it
    // localStorage.setItem('user', JSON.stringify(data)); // If using localStorage, ensure security measures are in place
  }, []);

  const logout = useCallback(() => {
    setAuthData(null);
    // Handle any cleanup or post-logout logic here
  }, []);

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
