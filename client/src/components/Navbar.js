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
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#1A1A1A]">
          🩺 MediSage
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-base font-medium text-[#6B7280] absolute left-1/2 transform -translate-x-1/2">
          <a href="#how-it-works" className="hover:text-[#4F46E5] transition duration-300">
            How it works
          </a>
          <a href="#features" className="hover:text-[#4F46E5] transition duration-300">
            Features
          </a>
          <a href="#use-cases" className="hover:text-[#4F46E5] transition duration-300">
            Use Cases
          </a>
          <a href="#about" className="hover:text-[#4F46E5] transition duration-300">
            Contact
          </a>
          <a href="https://github.com/Nova-022005/MediSage" target="_blank" rel="noopener noreferrer" className="hover:text-[#4F46E5] transition duration-300 flex items-center gap-2">
            View on Github
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-3 items-center">
          <Link
            to="/login"
            className="text-[#1A1A1A] px-5 py-2.5 font-medium rounded-xl border-2 border-[#E5E7EB] hover:bg-[#1A1A1A] hover:text-white transition duration-300 inline-flex items-center justify-center"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-[#4F46E5] text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:bg-[#4338CA] hover:shadow-md transition-all duration-300 inline-flex items-center justify-center"
          >
            Sign up for demo
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <button
            onClick={toggleMenu}
            className="text-3xl text-[#1A1A1A] focus:outline-none"
          >
            ☰
          </button>

          <div
            ref={menuRef}
            className={`absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 z-50 ${menuOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
              }`}
          >
            <a
              href="#how-it-works"
              className="block px-4 py-2 text-[#6B7280] hover:bg-[#F5F5F7]"
            >
              How it works
            </a>
            <a
              href="#features"
              className="block px-4 py-2 text-[#6B7280] hover:bg-[#F5F5F7]"
            >
              Features
            </a>
            <a
              href="#use-cases"
              className="block px-4 py-2 text-[#6B7280] hover:bg-[#F5F5F7]"
            >
              Use Cases
            </a>
            <a
              href="#about"
              className="block px-4 py-2 text-[#6B7280] hover:bg-[#F5F5F7]"
            >
              Contact
            </a>
            <Link
              to="/login"
              className="block px-4 py-2 text-[#6B7280] hover:bg-[#F5F5F7]"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="block px-4 py-2 bg-[#4F46E5] text-white hover:bg-[#4338CA] text-center"
            >
              Sign up for demo
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
