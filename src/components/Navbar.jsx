import React, { useEffect, useState } from "react";
import { FaAccusoft, FaAmilia } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../Hook/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, signOutUser, setLoading } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully 👋");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-primary font-bold" : "font-semibold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/arts"}
          end
          className={({ isActive }) =>
            isActive ? "border-b-2 border-primary font-bold" : "font-semibold"
          }
        >
          Explore Artworks
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-primary font-bold" : "font-semibold"
          }
        >
          Community
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-primary font-bold" : "font-semibold"
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-primary font-bold" : "font-semibold"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-200">
      <div className="navbar w-11/12 mx-auto py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-4 w-6 master-shadow p-4 shadow-xl border border-base-200"
            >
              {links}
            </ul>
          </div>
          <Link
            to={"/"}
            className="flex items-center gap-2 transition-transform hover:scale-105"
          >
            <div className="bg-primary p-2 rounded-xl text-white">
              <FaAmilia size={24} />
            </div>
            <span className="font-extrabold text-2xl tracking-tight hidden sm:block">
              Artify
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-4">
          <div className="hidden sm:flex items-center mr-2">
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="checkbox"
              checked={theme === "dark"}
              className="toggle toggle-primary"
            />
          </div>
          {!user ? (
            <div className="flex gap-2">
              <Link to="/auth" className="btn btn-ghost font-semibold">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/20">
                Register
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-2xl ring ring-primary ring-offset-2 ring-offset-base-100 overflow-hidden shadow-lg">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/5vFdhSM/default-avatar.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul className="dropdown-content mt-4 p-3 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200 z-50">
                <div className="px-4 py-3 mb-2 border-b border-base-200">
                  <p className="font-bold text-base truncate">{user.displayName || "User"}</p>
                  <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                </div>
                <li>
                  <Link to="/dashboard/profile" className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-xl transition-colors">
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-xl transition-colors">
                    <span>My Dashboard</span>
                  </Link>
                </li>
                <div className="sm:hidden p-3 border-t border-base-200 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dark Mode</span>
                    <input
                      onChange={(e) => handleTheme(e.target.checked)}
                      type="checkbox"
                      checked={theme === "dark"}
                      className="toggle toggle-sm toggle-primary"
                    />
                  </div>
                </div>
                <li className="mt-2 pt-2 border-t border-base-200">
                  <button
                    onClick={handleLogOut}
                    className="flex w-full items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
