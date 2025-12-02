import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const activeClass =
    "pb-1 border-b-2 border-green-600 text-green-700 font-semibold";
  const normalClass = "hover:text-black";

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-5">

        {/* LEFT = Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/assets/logo.png" alt="logo" className="w-11 h-11 object-contain" />
          <h1 className="font-semibold text-xl text-black">KrishiLink</h1>
        </Link>

        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul
          className={`
            md:flex md:items-center md:gap-10 text-gray-700 font-medium 
            absolute md:static bg-white w-full md:w-auto left-0 
            px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none
            transition-all duration-300 text-center
            ${open ? "top-16 opacity-100" : "top-[-400px] opacity-0 md:opacity-100"}
          `}
        >
          <li className="py-2 md:py-0">
            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : normalClass)}>
              Home
            </NavLink>
          </li>

          <li className="py-2 md:py-0">
            <NavLink
              to="/allcrops"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              All Crops
            </NavLink>
          </li>

          {user && (
            <>
              <li className="py-2 md:py-0">
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Profile
                </NavLink>
              </li>

              <li className="py-2 md:py-0">
                <NavLink
                  to="/addcrops"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  Add Crops
                </NavLink>
              </li>

              <li className="py-2 md:py-0">
                <NavLink
                  to="/myposts"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  My Posts
                </NavLink>
              </li>

              <li className="py-2 md:py-0">
                <NavLink
                  to="/myinterests"
                  className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                  My Interests
                </NavLink>
              </li>
            </>
          )}

          {/* MOBILE LOGIN/LOGOUT */}
          <div className="md:hidden mt-4">
            {user ? (
              <button
                onClick={logout}
                className="w-full px-6 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full text-center px-6 py-2 mb-2 bg-green-100 border border-green-300 rounded-lg font-semibold text-green-900 hover:bg-green-200"
                >
                  Log In
                </Link>

                <Link
                  to="/signup"
                  className="block w-full text-center px-6 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </ul>

        <div className="hidden md:flex items-center gap-3">
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
