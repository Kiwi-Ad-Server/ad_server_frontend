import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/PrivateRoute";
import {
  AdminDashboard,
  AdvertiserDashboard,
  PublisherDashboard,
} from "./pages";
import { Login, Register } from "./components";
// import {PublisherDashboard} from "./pages/PublisherDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/advertiser-dashboard"
          element={
            <ProtectedRoute>
              <AdvertiserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publisher-dashboard"
          element={
            <ProtectedRoute>
              <PublisherDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
