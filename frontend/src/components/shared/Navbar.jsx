import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (e.g., by checking token in localStorage)
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken); // Update state based on token presence
  }, []);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Cool Kids Network
        </Link>
        <div className="space-x-4">
          {/* Show "Sign In" and "Sign Up" if the user is not logged in */}
          {!isLoggedIn ? (
            <>
              <Link to="/signup" className="hover:text-gray-300">
                Sign Up
              </Link>
              <Link to="/login" className="hover:text-gray-300">
                Sign In
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
