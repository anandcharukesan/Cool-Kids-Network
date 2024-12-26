// src/components/CoolKid.jsx
import { useAuth } from "../context/AuthContext";

const CoolKid = () => {
  const { user } = useAuth();

  if (!user || user.role !== "Cool Kid") {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800">Cool Kid Profile</h2>
      <div className="mt-4">
        <p className="text-xl text-slate-800">
          <span className="font-bold">Name:</span> {user.firstName}{" "}
          {user.lastName}
        </p>
        <p className="text-xl text-slate-800">
          <span className="font-bold">Country:</span> {user.country}
        </p>
        <p className="text-xl text-slate-800">
          <span className="font-bold">Email:</span> {user.email}
        </p>
        <p className="text-xl text-slate-800">
          <span className="font-bold">Role:</span> {user.role}
        </p>
      </div>
    </div>
  );
};

export default CoolKid;
