import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  // State hooks for managing email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Destructuring login function from the useAuth hook
  const { login, authData } = useAuth();
  // Hook for navigation
  let navigate = useNavigate();

  useEffect(() => {
    // If authData is updated and contains user data, redirect the user
    if (authData) {
      // Redirect based on the user's role
      const path = getRedirectPath(authData.role);
      navigate(path);
    }
  }, [authData, navigate]); // Re-run when authData or navigate changes

  const getRedirectPath = (role) => {
    switch (role) {
      case "Admin":
        return "/admin-dashboard";
      case "Advertiser":
        return "/advertiser-dashboard";
      case "Publisher":
        return "/publisher-dashboard";
      default:
        return "/";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting login"); // Debug log
      await login(email, password);
      console.log("Login successful"); // Debug log
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <div>
        <p>
          Don't have an account yet?
          <button type="button" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>
      </div>
    </form>
  );
};

export default Login;
