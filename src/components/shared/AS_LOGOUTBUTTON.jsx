// components/shared/LogoutButton.js

import React from "react";
import { useAuth } from "../../context/AuthContext"; // Adjust the import path as needed

const AS_LOGOUTBUTTON = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally, redirect to the login page or show a message
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default AS_LOGOUTBUTTON;
