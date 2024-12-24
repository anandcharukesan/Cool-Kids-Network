import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Cool Kids App
        </h1>
        <p className="mb-6">
          This is the ultimate platform for Cool Kids! Log in or sign up to
          explore.
        </p>
        <div>
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-4"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
