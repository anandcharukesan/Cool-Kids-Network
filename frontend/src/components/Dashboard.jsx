import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CoolerKid from "./CoolerKid";
import CoolestKid from "./CoolestKid";
import UserGrid from "./Usergrid";
import CoolKid from "./Coolkid";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      {user?.role === "Cool Kid" && <CoolKid />}
      {user?.role === "Cooler Kid" && <CoolerKid />}
      {user?.role === "Coolest Kid" && <CoolestKid />}
      {user?.role === "Admin" && <UserGrid />}
    </div>
  );
};

export default Dashboard;
