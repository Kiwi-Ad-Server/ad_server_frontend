import React from "react";
import { useAuth } from "../context/AuthContext";

function AdvertiserDashboard() {
  const { logout } = useAuth();

  // Function to handle the logout action
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      // You can redirect or perform additional actions upon successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div>
      <h1>Advertiser Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdvertiserDashboard;
