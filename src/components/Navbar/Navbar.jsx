import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

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

          {/* Always-visible links */}
          <li>
            <Link to="/" className="hover:text-black">Home</Link>
          </li>
          <li>
            <Link to="/allcrops" className="hover:text-black">All Crops</Link>
          </li>

          {/* Visible only when user is logged in */}
          {user && (
            <>
              <li>
                <Link to="/profile" className="hover:text-black">Profile</Link>
              </li>
              <li>
                <Link to="/addcrops" className="hover:text-black">Add Crops</Link>
              </li>
              <li>
                <Link to="/myposts" className="hover:text-black">My Posts</Link>
              </li>
              <li>
                <Link to="/myinterests" className="hover:text-black">My Interests</Link>
              </li>
            </>
          )}
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          
          {user ? (
            // USER LOGGED IN → SHOW LOGOUT
            <button
              onClick={logout}
              className="px-6 py-2 bg-green-500 rounded-lg font-semibold text-white hover:bg-green-600"
            >
              Logout
            </button>
          ) : (
            // USER NOT LOGGED IN → SHOW LOGIN + SIGNUP
            <>
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
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
