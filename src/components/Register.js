import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { register, authData } = useAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      // If the user is directly logged in upon registration, redirect based on role
      // Otherwise, redirect to the login page or a confirmation page
      const path =
        authData?.user?.role === "Admin"
          ? "/admin-dashboard"
          : authData?.user?.role === "Advertiser"
          ? "/advertiser-dashboard"
          : "/publisher-dashboard"; // Adjust paths as necessary
      navigate(path);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>

      <div>
        <p>
          {" "}
          Already have an account?{" "}
          <button onClick={() => navigate("/login")}>Login</button>
        </p>
      </div>
    </form>
  );
};

export default Register;
