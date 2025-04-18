import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        Dashboard
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-blue-400 transition">
          Dashboard
        </Link>
        <Link to="/repositories" className="hover:text-blue-400 transition">
          Repositories
        </Link>
        <Link to="/activity" className="hover:text-blue-400 transition">
          Activity
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            menu.classList.toggle("hidden");
          }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        id="mobile-menu"
        className="absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg md:hidden hidden"
      >
        <Link
          to="/"
          className="block w-full text-left mb-2 hover:text-blue-400 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/repositories"
          className="block w-full text-left mb-2 hover:text-blue-400 transition"
        >
          Repositories
        </Link>
        <Link
          to="/activity"
          className="block w-full text-left hover:text-blue-400 transition"
        >
          Activity
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
