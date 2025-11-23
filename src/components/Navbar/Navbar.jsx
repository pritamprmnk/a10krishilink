import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-5">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/assets/logo.png" alt="logo" className="w-11 h-11 object-contain" />
          <h1 className="font-semibold text-xl text-black">KrishiLink</h1>
        </Link>

        {/* Menu Items */}
        <ul className="flex items-center gap-10 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-black">Home</Link>
          </li>
          <li>
            <Link to="/allcrops" className="hover:text-black">All Crops</Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link 
            to="/login"
            className="px-6 py-2 bg-green-100 border border-green-300 rounded-lg font-semibold text-green-900 hover:bg-green-200"
          >
            Log In
          </Link>

          <Link 
            to="/signup"
            className="px-6 py-2 bg-green-500 rounded-lg font-semibold text-white hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;