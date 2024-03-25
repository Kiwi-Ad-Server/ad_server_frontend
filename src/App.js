import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdvertiserDashboard, PublisherDashboard } from "./pages";
import { Login, Register } from "./components";
// import {PublisherDashboard} from "./pages/PublisherDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/advertiser-dashboard" element={<AdvertiserDashboard />} />
        <Route path="/publisher-dashboard" element={<PublisherDashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
