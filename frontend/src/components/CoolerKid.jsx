// src/components/CoolerKid.jsx
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaMapMarkerAlt, FaEnvelope, FaUserTag } from "react-icons/fa";

const CoolerKid = () => {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);

  // Fetch all users if the user is "Cooler Kid" or "Coolest Kid"
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.post(
          "https://coolkidsnetwork.vercel.app/users/all/cooler",
          {
            role: user.role,
          }
        );
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
    <div className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800">Cooler Kid Profile</h2>
      <div className="mt-4">
        <p className="text-xl text-slate-600">
          Name: {user.firstName} {user.lastName}
        </p>
        <p className="text-xl text-slate-600">Country: {user.country}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-slate-800">All Users:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {allUsers.map((userData, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-slate-200 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out"
            >
              <p className="flex items-center mb-2 text-lg font-bold text-slate-800">
                <FaUser className="mr-2 text-purple-400" />
                Name: {userData.first_name} {userData.last_name}
              </p>
              <p className="flex items-center mb-2 text-slate-600">
                <FaMapMarkerAlt className="mr-2 text-purple-400" />
                Country: {userData.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoolerKid;
