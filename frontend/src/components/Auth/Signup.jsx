import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      alert(data.message || "User created successfully!");
    } catch (error) {
      alert("Error signing up");
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md w-80">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />
      <button
        onClick={handleSignup}
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
      >
        Sign Up
      </button>
    </div>
  );
}

export default Signup;
