import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.token) {
        const user = {
          ...data.character,
          token: data.token,
        };

        login(user);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-16 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl  shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="email"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring focus:ring-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Centered Login Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="min-w-10 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
