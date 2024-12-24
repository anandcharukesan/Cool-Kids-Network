// src/components/CoolerKid.jsx
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const CoolerKid = () => {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all users if the user is "Cooler Kid" or "Coolest Kid"
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.post("http://localhost:3000/users/all/cooler", {
          role: user.role,
        });
        setAllUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (user.role === "Cooler Kid" || user.role === "Coolest Kid") {
      fetchAllUsers();
    }
  }, [user]);

  if (!user || user.role !== "Cooler Kid") {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div className="p-6 bg-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold">Cooler Kid Profile</h2>
      <div className="mt-4">
        <p className="text-xl">
          Name: {user.firstName} {user.lastName}
        </p>
        <p className="text-xl">Country: {user.country}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">All Users:</h3>
        <div className="mt-4">
          {allUsers.map((userData, index) => (
            <div key={index} className="p-4 bg-white mb-4 rounded-lg shadow-md">
              <p className="font-bold">
                {userData.first_name} {userData.last_name}
              </p>
              <p>{userData.country}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoolerKid;
