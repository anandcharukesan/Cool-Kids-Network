import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";

const UserGrid = () => {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Track which user is being edited
  const [newRole, setNewRole] = useState(""); // New role for user

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;

      try {
        const response = await axios.get(
          "http://localhost:3000/users/all/maintainer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAllUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleEditClick = (userData) => {
    setEditingUser(userData); // Set the user to be edited
    setNewRole(userData.role); // Set the current role to the dropdown
  };

  const handleRoleChange = async (email) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    try {
      // Send request to change user role
      await axios.put(
        `http://localhost:3000/roles/assign`,
        { role: newRole, email: email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the role locally
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === editingUser.email ? { ...user, role: newRole } : user
        )
      );

      // Clear the editing user and new role
      setEditingUser(null);
      setNewRole("");
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (!user || user.role !== "Admin") {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800">Admin Profile</h2>
      <div className="mt-4">
        <p className="text-xl text-slate-600">Email: {user.email}</p>
        <p className="text-xl text-slate-600">Role: {user.role}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-slate-800">All Users:</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allUsers.map((userData, index) => (
            <div
              key={index}
              className="relative p-6 bg-white border border-slate-200 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out"
            >
              <button
                onClick={() => handleEditClick(userData)}
                className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 text-white bg-slate-800 rounded-full focus:ring-4 focus:outline-none focus:ring-slate-800 transition"
                aria-label="Edit Role"
              >
                <FaPencilAlt size={14} />
              </button>

              <h5 className="mb-2 text-lg font-bold text-slate-800">
                {userData.first_name} {userData.last_name}
              </h5>
              <p className="mb-2 text-slate-600">
                <strong>Country:</strong> {userData.country}
              </p>
              <p className="mb-2 text-slate-600">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="mb-2 text-slate-600">
                <strong>Role:</strong> {userData.role}
              </p>

              {editingUser?.email === userData.email && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg animate-fade-in">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full p-2 border rounded bg-white text-slate-800"
                  >
                    <option value="Cool Kid">Cool Kid</option>
                    <option value="Cooler Kid">Cooler Kid</option>
                    <option value="Coolest Kid">Coolest Kid</option>
                  </select>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleRoleChange(userData.email)}
                      className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      Save Role
                    </button>
                    <button
                      onClick={() => setEditingUser(null)}
                      className="px-3 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserGrid;
