import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import RoleCard from "./Usergrid";
import CoolerKid from "./CoolerKid";
import CoolestKid from "./CoolestKid";
import UserGrid from "./Usergrid";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      {user?.role === "Cool Kid" && <p>You can only see limited details.</p>}
      {user?.role === "Cooler Kid" && <CoolerKid />}
      {user?.role === "Coolest Kid" && <CoolestKid />}
      {user?.role === "Admin" && <UserGrid />}
    </div>
  );
};

export default Dashboard;
