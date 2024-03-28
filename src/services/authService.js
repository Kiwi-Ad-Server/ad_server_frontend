import axios from "axios";

// Base URL for the auth-related API endpoints
const API_URL = "http://localhost:5000/api/auth/";

const authService = {
  // Function to handle user registration
  register: (username, email, password) => {
    // Send a POST request to the register endpoint
    return axios.post(`${API_URL}register`, {
      username,
      email,
      password,
    });
  },

  // Function to handle user login
  login: (email, password) => {
    // Send a POST request to the login endpoint
    return axios.post(`${API_URL}login`, { email, password });
  },

  // Function to handle user logout
  logout: () => {
    // Send a POST request to the logout endpoint
    return axios.post(`${API_URL}logout`);
  },

  // Function to validate the current session
  validateSession: () => {
    // Send a GET request to the session validation endpoint
    // and return user data if successful
    return axios
      .get(`${API_URL}validate-session`, { withCredentials: true })
      .then((response) => response.data.user);
  },
};

export default authService;
