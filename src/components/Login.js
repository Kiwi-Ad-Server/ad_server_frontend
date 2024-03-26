import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Register } from "./Register";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // useAuth hook provides login
      // Redirect based on role, stored in authData within useAuth
      navigate("/advertiser-dashboard"); // Placeholder, adjust based on actual role logic
    } catch (error) {
      console.error("Login failed: ", error);
      // Optionally, handle login failure (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <div>
      <p> Don't have an account yet? <button onClick={() => navigate("/register")}>Register</button></p>
      </div>
    </form>
  );
};

export default Login;
