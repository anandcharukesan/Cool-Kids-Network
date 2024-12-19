// UserList.jsx
import React, { useState, useEffect } from 'react';

const UserList = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`http://localhost:3000/auth/users?role=${role}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [role]);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold">{user.first_name} {user.last_name}</h3>
          <p className="text-gray-600">{user.country}</p>
          {role === "Coolest Kid" && (
            <>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">Role: {user.role}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserList;