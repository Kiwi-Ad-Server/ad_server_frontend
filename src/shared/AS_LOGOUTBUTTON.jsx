// components/shared/LogoutButton.js

import React from "react";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as needed
import { Button } from "semantic-ui-react";

const AS_LOGOUTBUTTON = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button negative onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default AS_LOGOUTBUTTON;
