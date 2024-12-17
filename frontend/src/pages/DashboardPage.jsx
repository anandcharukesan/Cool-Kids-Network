import React, { useEffect, useState } from "react";
import CharacterCard from "../components/Dashboard/CharacterCard";
import UserList from "../components/Dashboard/UserList";

const DashboardPage = () => {
  const [character, setCharacter] = useState(null);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage or wherever it is stored
    if (token) {
      fetch("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token with the request
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.character) {
            setCharacter(data.character);
            setRole(data.character.role);
          } else {
            console.error("Unable to load character");
          }
        })
        .catch((error) =>
          console.error("Error fetching character data:", error)
        );
    } else {
      console.log("User is not logged in");
    }
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      {character && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Character
          </h2>
          <CharacterCard character={character} />
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
          You don’t have permission to view other users’ data.
        </p>
      )}
    </div>
  );
};

export default DashboardPage;
