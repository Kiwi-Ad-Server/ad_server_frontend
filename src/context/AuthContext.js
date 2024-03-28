import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import authService from "../services/authService";
import AS_LOADER from "../components/shared/AS_LOADER";

// Creating a context for auth-related data
const AuthContext = createContext();

// Custom hook for easy context consumption
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap the part of your app that needs auth state
export const AuthProvider = ({ children }) => {
  // State to hold authentication data
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check the current session's validity against the backend
  const validateSession = async () => {
    try {
      // Attempt to validate the session and set the user data on success
      const user = await authService.validateSession();
      setAuthData(user);
    } catch (error) {
      // Log and clear auth data if session validation fails
      console.log("Session validation failed:", error);
      setAuthData(null);
    } finally {
      setLoading(false);
    }
  };

  // Validate session on component mount to maintain session across refreshes
  useEffect(() => {
    validateSession();
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      // Use authService to log the user in
      await authService.login(email, password);
      // Re-validate the session to update auth state after successful login
      await validateSession();
    } catch (error) {
      // Log any errors during the login process
      console.error("Login error:", error.message);
    }
  };

  // Function to handle user logout
  const logout = useCallback(async () => {
    try {
      // Use authService to log the user out
      await authService.logout();

      setAuthData(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  // Omit rendering the children routes until the session check is complete
  if (loading) {
    return <AS_LOADER />;
  }
  // Provide auth state and functions to the rest of the app
  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
