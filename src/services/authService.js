import axios from "axios";

// Axios instance specific to the auth service
const axiosInstance = axios.create({
  baseURL: "https://kiwiad-server-api.onrender.com/api/auth/",
  withCredentials: true,
});

const authService = {
  // Async function to handle user registration
  register: async (data) => {
    try {
      const response = await axiosInstance.post("register", data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Registration failed");
    }
  },

  // Async function to handle user login
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("login", { email, password });
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
  // Async function to validate the current session
  validateSession: async () => {
    try {
      // Retrieve the authentication token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Include the authentication token in the request headers
      const response = await axiosInstance.get("validate-session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.user; // Return the user data from the response
    } catch (error) {
      throw new Error(
        error.response.data.message || "Session validation failed"
      );
    }
  },
};

export default authService;
