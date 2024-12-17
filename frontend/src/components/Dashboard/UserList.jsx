import React, { useEffect, useState } from "react";

const UserList = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken"); // Assume token is stored in localStorage

    // Fetch all users data based on role
    fetch("http://localhost:3000/characters", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error("Error fetching user list:", error);
        setError("Unable to load users. Please try again later.");
      });
  }, []);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.email} className="bg-gray-100 p-4 rounded shadow mb-4">
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
            {role === "Coolest Kid" && (
              <>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.role}
                </p>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default UserList;
