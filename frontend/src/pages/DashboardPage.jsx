// DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CharacterCard from "../components/Dashboard/CharacterCard";
import UserList from "../components/Dashboard/UserList";

const DashboardPage = () => {
  const [character, setCharacter] = useState(null);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacterData = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("userToken");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch character data");
        }

        const data = await response.json();

        if (data.character) {
          setCharacter(data.character);
          setRole(data.character.role);
          localStorage.setItem("userRole", data.character.role);
        } else {
          setError("Unable to load character data");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching character data:", err);
      }
    };

    fetchCharacterData();
  }, [navigate]);

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {character ? (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Character
          </h2>
          <CharacterCard character={character} />
        </div>
      ) : (
        <div className="mb-8">
          <p className="text-gray-600">Loading character data...</p>
        </div>
      )}

      {role === "Cooler Kid" || role === "Coolest Kid" ? (
        <>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            All Users
          </h2>
          <UserList role={role} />
        </>
      ) : (
        <p className="text-gray-600">
          You don't have permission to view other users' data.
        </p>
      )}
    </div>
  );
};

export default DashboardPage;
