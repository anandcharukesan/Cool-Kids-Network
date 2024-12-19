import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/shared/Navbar"; // Import the Navbar
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      navigate("/dashboard"); // If user is logged in, redirect to dashboard
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar here */}
      <AppRoutes /> {/* Define routes inside Router */}
    </Router>
  );
};

export default App;
