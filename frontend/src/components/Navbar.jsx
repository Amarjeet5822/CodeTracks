import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import {  logoutUser } from "../RTK/features/authSlice";
import { useDispatch } from "react-redux";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <nav className="bg-gray-600 text-white py-4 px-6 flex justify-between items-center relative shadow-md">
      {/* Logo */}
      <Link to="/home" className="text-xl font-bold">
        Dashboard
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/home" className="hover:text-blue-400">
          Dashboard
        </Link>
        <Link to="/repositories" className="hover:text-blue-400">
          Repositories
        </Link>
        <Link to="/activity" className="hover:text-blue-400">
          Activity
        </Link>
        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-1 bg-red-500 hover:bg-red-600 rounded text-sm"
        >
          Logout
        </button>
      </div>

      {/* Hamburger for mobile */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(true)}
      >
        <i className="fas fa-bars text-2xl"></i>
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full bg-gray-600 text-white z-50 shadow-lg p-4">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>

          <div className="flex flex-col space-y-4 items-start mt-8">
            <Link
              to="/home"
              onClick={() => setMenuOpen(false)}
              className="text-lg hover:text-blue-400"
            >
              🧭 Dashboard
            </Link>
            <Link
              to="/repositories"
              onClick={() => setMenuOpen(false)}
              className="text-lg hover:text-blue-400"
            >
              📁 Repositories
            </Link>
            <Link
              to="/activity"
              onClick={() => setMenuOpen(false)}
              className="text-lg hover:text-blue-400"
            >
              📊 Activity
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="text-lg text-red-400 hover:text-red-300"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
