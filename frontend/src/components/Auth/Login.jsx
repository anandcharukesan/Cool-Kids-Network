import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid email or user not found");
        }
        return response.json();
      })
      .then((data) => {
        // Save the user data in localStorage or state management
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userRole", data.character.role);
        localStorage.setItem("userEmail", data.character.email);

        // Redirect to the dashboard after successful login
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Login failed. Please check your email.");
      });
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
