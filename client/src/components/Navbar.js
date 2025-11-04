import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-500 text-transparent bg-clip-text">
          MediSage
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
          <Link to="/" className="relative group">
            Dashboard
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/upload" className="relative group">
            Upload
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/ai-insights" className="relative group">
            AI Insights
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link to="/insurance" className="relative group">
            Insurance
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="text-gray-700 px-4 py-2 font-medium rounded-xl border border-teal-500 hover:bg-teal-50 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-teal-600 text-white px-5 py-2 rounded-xl shadow hover:bg-teal-500 transition duration-300"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <button
            onClick={toggleMenu}
            className="text-3xl text-teal-600 focus:outline-none"
          >
            ☰
          </button>

          <div
            ref={menuRef}
            className={`absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 z-50 ${
              menuOpen
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
            >
              Dashboard
            </Link>
            <Link
              to="/upload"
              className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
            >
              Upload
            </Link>
            <Link
              to="/ai-insights"
              className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
            >
              AI Insights
            </Link>
            <Link
              to="/insurance"
              className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
            >
              Insurance
            </Link>
            <Link
              to="/login"
              className="block px-4 py-2 text-gray-800 hover:bg-teal-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 bg-teal-600 text-white hover:bg-teal-500 text-center"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
