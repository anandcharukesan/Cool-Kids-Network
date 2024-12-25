import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Cool Kids App
        </Link>
        <div>
          {user ? (
            <div className="flex items-center">
              <span className="text-white mr-4">{user.role}</span>
              <button
                onClick={handleLogout}
                className="min-w-5 rounded-md bg-slate-800 py-2 px-4 border border-white text-white transition-all shadow-md hover:shadow-lg hover:bg-white hover:text-slate-800 focus:shadow-none active:bg-white active:text-slate-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to="/login"
                className="min-w-5 rounded-md bg-slate-800 py-2 px-4 border border-white text-white transition-all shadow-md hover:shadow-lg hover:bg-white hover:text-slate-800 focus:shadow-none active:bg-white active:text-slate-800 mr-4"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="min-w-5 rounded-md bg-slate-800 py-2 px-4 border border-white text-white transition-all shadow-md hover:shadow-lg hover:bg-white hover:text-slate-800 focus:shadow-none active:bg-white active:text-slate-800"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
