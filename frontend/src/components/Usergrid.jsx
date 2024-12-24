import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const UserGrid = () => {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Track which user is being edited
  const [newRole, setNewRole] = useState(""); // New role for user

  // Fetch all users if the user is "Coolest Kid"
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
    <div className="p-6 bg-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold">Admin Profile</h2>
      <div className="mt-4">
        <p className="text-xl">Email: {user.email}</p>
        <p className="text-xl">Role: {user.role}</p>
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
              <p>{userData.email}</p>
              <p>{userData.role}</p>

              {/* Edit Button */}
              <button
                onClick={() => handleEditClick(userData)}
                className="mt-2 p-2 bg-blue-500 text-white rounded"
              >
                Edit Role
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Role Form */}
      {editingUser && (
        <div className="mt-6 p-4 bg-gray-300 rounded-lg">
          <h4 className="text-xl font-semibold">
            Edit Role for {editingUser.first_name} {editingUser.last_name}
          </h4>
          <div className="mt-2">
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="Cool Kid">Cool Kid</option>
              <option value="Cooler Kid">Cooler Kid</option>
              <option value="Coolest Kid">Coolest Kid</option>
            </select>
          </div>
          <div className="mt-4">
            <button
              onClick={() => handleRoleChange(editingUser.email)}
              className="p-2 bg-green-500 text-white rounded"
            >
              Save Role
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="ml-4 p-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGrid;
