import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BE_URL } from "../RTK/store/links";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.authUser);
  const navigate = useNavigate();

  useEffect(() => { 
    if (isAuthenticated) {
      navigate('/home');
    }
    fetch
  },[isAuthenticated])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-600 cursor-pointer select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* GitHub Login */}
        <button
          onClick={() => {
            window.location.href = `${BE_URL}/auth/github/callback`;
          }}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-900 transition cursor-pointer"
        >
          <FaGithub className="w-5 h-5" />
          Login with GitHub
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;


// Alphabet Display Component
const AlphabetDisplay = () => {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div className="mt-8 text-center">
      <h3 className="text-lg font-semibold mb-4">A to Z</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {alphabet.map((letter) => (
          <span
            key={letter}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

// Render AlphabetDisplay
<AlphabetDisplay />;