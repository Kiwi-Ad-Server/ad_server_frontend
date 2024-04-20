import axios from "axios";

// Axios instance specific to the auth service
const axiosInstance = axios.create({
  baseURL: "https://kiwiadserver.onrender.com/api/auth/",
  withCredentials: true, // Assuming credentials are needed for all requests
});

const authService = {
  // Async function to handle user registration
  register: async (data) => {
    try {
      const response = await axiosInstance.post("register", data);
      return response.data; // Assuming the response data is directly usable
    } catch (error) {
      // Consider logging the error to an external service
      throw new Error(error.response.data.message || "Registration failed");
    }
  },

  // Async function to handle user login
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("login", { email, password });
      // Optionally process response or directly return it
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Login failed");
    }
  },

  // Async function to handle user logout
  logout: async () => {
    try {
      const response = await axiosInstance.post("logout");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Logout failed");
    }
  },

  // Async function to validate the current session
  validateSession: async () => {
    try {
      const response = await axiosInstance.get("validate-session");
      return response.data.user; // Assuming the user's info is what's needed
    } catch (error) {
      throw new Error(
        error.response.data.message || "Session validation failed"
      );
    }
  },
};

export default authService;
