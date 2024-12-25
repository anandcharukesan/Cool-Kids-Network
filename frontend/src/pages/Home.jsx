import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-16 p-6">
      <div className="relative w-full max-w-md flex flex-col justify-center items-center bg-white shadow-sm border border-slate-200 rounded-lg p-6 sm:px-8 px-4">
        <div className="p-3 text-center">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 text-purple-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
          </div>
          <div className="flex justify-center mb-2">
            <h1 className="text-slate-800 text-2xl font-semibold">
              Welcome to the Cool Kids App
            </h1>
          </div>
          <p className="block text-slate-600 leading-normal font-light mb-4 max-w-lg">
            This is the ultimate platform for Cool Kids! Log in or sign up to
            explore and unleash your cool potential.
          </p>
          <div className="text-center flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/login"
              className="min-w-32 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="min-w-32 rounded-md bg-purple-600 py-2 px-4 border border-transparent text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-purple-500 focus:shadow-none active:bg-purple-500 hover:bg-purple-500 active:shadow-none"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
