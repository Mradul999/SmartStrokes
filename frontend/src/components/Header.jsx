import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import authStore from "../store/store.js";

const Header = () => {
  const currentUser = authStore((state) => state.currentUser);
  const logout = authStore((state) => state.logout);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center px-10 py-4 bg-purple-700 text-white shadow-md relative">
      <NavLink to="/">
        <div className="text-2xl font-bold tracking-wide">TypeMaster</div>
      </NavLink>

      <div className="flex items-center gap-4 relative">
        {!currentUser ? (
          <>
            <NavLink to="/signup">
              <button className="bg-white text-purple-700 font-semibold px-4 py-1 rounded hover:bg-purple-100 transition-all">
                Sign Up
              </button>
            </NavLink>
            <NavLink to="/signin">
              <button className="bg-white text-purple-700 font-semibold px-4 py-1 rounded hover:bg-purple-100 transition-all">
                Sign In
              </button>
            </NavLink>
          </>
        ) : (
          <div className="relative" ref={menuRef}>
            <div
              className="w-10 h-10 cursor-pointer"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <img
                src={
                  currentUser.profilePic ||
                  "https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"
                }
                alt="User"
                className="rounded-full w-full h-full object-cover border-2 border-white"
              />
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setShowMenu(false)}
                >
                  User Dashboard
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    navigate("/signin");
                    setShowMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
