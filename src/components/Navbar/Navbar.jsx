import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const activeClass =
    "pb-1 border-b-2 border-green-600 text-green-700 font-semibold";

  const normalClass = "hover:text-black";

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-5">

        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/assets/logo.png" alt="logo" className="w-11 h-11 object-contain" />
          <h1 className="font-semibold text-xl text-black">KrishiLink</h1>
        </Link>

        <ul className="flex items-center gap-10 text-gray-700 font-medium">

          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/allcrops"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              All Crops
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/addcrops"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Add Crops
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/myposts"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  My Posts
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/myinterests"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  My Interests
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={logout}
              className="px-6 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-2 bg-green-100 border border-green-300 rounded-lg font-semibold text-green-900 hover:bg-green-200"
              >
                Log In
              </Link>

              <Link
                to="/signup"
                className="px-6 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
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
