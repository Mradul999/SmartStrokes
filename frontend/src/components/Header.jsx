import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import authStore from "../store/store.js";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const currentUser = authStore((state) => state.currentUser);
  const logout = authStore((state) => state.logout);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const logoutHandler = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      logout();
      navigate("/signin");
      setShowMenu(false);
    } catch (error) {}
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  let headerBg;
  if (theme === "dark") {
    headerBg = scrolled
      ? "bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 shadow-lg shadow-black/20"
      : "bg-gradient-to-r from-gray-900 to-gray-800";
  } else {
    headerBg = scrolled
      ? "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg"
      : "bg-gradient-to-r from-purple-600 to-indigo-600";
  }

  const textColor =
    theme === "dark"
      ? scrolled
        ? "text-gray-200"
        : "text-white"
      : scrolled
      ? "text-purple-600"
      : "text-white";

  const linkBgActive =
    theme === "dark"
      ? scrolled
        ? "bg-purple-700 text-white"
        : "bg-gray-800/80 text-purple-300"
      : scrolled
      ? "bg-purple-600 text-white"
      : "bg-white/90 text-purple-700";

  const linkBgNormal =
    theme === "dark"
      ? scrolled
        ? "bg-gray-700/80 text-gray-200 hover:bg-gray-600"
        : "bg-gray-800/50 text-gray-200 hover:bg-gray-800/70"
      : scrolled
      ? "bg-purple-50 text-purple-700 hover:bg-purple-100"
      : "bg-white/20 text-white hover:bg-white/30";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg} ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <div className={`flex items-center ${textColor}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 mr-2"
              >
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
              <span className="text-2xl font-bold tracking-tight">
                SmartStrokes
              </span>
            </div>
          </NavLink>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="mr-2">
              <ThemeToggle size="sm" />
            </div>

            <NavLink
              to="/about"
              className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                isActive("/about") ? linkBgActive : linkBgNormal
              }`}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                isActive("/contact") ? linkBgActive : linkBgNormal
              }`}
            >
              Contact
            </NavLink>

            {!currentUser ? (
              <>
                <NavLink
                  to="/signup"
                  className={`hidden sm:flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    isActive("/signup") ? linkBgActive : linkBgNormal
                  }`}
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/signin"
                  className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    isActive("/signin")
                      ? linkBgActive
                      : theme === "dark"
                      ? scrolled
                        ? "bg-purple-700/90 text-white hover:bg-purple-600"
                        : "bg-purple-700/80 text-white hover:bg-purple-600"
                      : scrolled
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-white/90 text-purple-700 hover:bg-white"
                  }`}
                >
                  Sign In
                </NavLink>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <div
                  className={`flex items-center gap-3 cursor-pointer py-1.5 px-3 rounded-lg ${
                    theme === "dark"
                      ? scrolled
                        ? "hover:bg-gray-700/70"
                        : "hover:bg-gray-800/60"
                      : scrolled
                      ? "hover:bg-gray-100"
                      : "hover:bg-white/20"
                  }`}
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  <div className="hidden md:block">
                    <p
                      className={`text-sm font-medium ${
                        theme === "dark"
                          ? "text-gray-200"
                          : scrolled
                          ? "text-gray-700"
                          : "text-white"
                      }`}
                    >
                      {currentUser.name && currentUser.name.split(" ")[0]}
                    </p>
                    <p
                      className={`text-xs ${
                        theme === "dark"
                          ? "text-gray-400"
                          : scrolled
                          ? "text-gray-500"
                          : "text-purple-200"
                      }`}
                    >
                      View dashboard
                    </p>
                  </div>
                  <div className="relative w-9 h-9">
                    <img
                      src={
                        currentUser?.profileImage ||
                        "https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"
                      }
                      alt="User"
                      className="rounded-full w-full h-full object-cover border-2 shadow-sm"
                      style={{
                        borderColor:
                          theme === "dark"
                            ? scrolled
                              ? "#374151"
                              : "#1f2937"
                            : scrolled
                            ? "#e5e7eb"
                            : "#ffffff",
                      }}
                    />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 bg-green-400 ${
                        theme === "dark"
                          ? scrolled
                            ? "border-gray-800"
                            : "border-gray-900"
                          : scrolled
                          ? "border-white"
                          : "border-purple-600"
                      }`}
                    ></div>
                  </div>
                </div>

                {showMenu && (
                  <div
                    className={`absolute right-0 mt-2 w-56 ${
                      theme === "dark"
                        ? "bg-gray-800 shadow-lg shadow-black/50 border border-gray-700"
                        : "bg-white shadow-lg border border-gray-100"
                    } rounded-xl overflow-hidden z-50`}
                  >
                    <div
                      className={`p-3 ${
                        theme === "dark"
                          ? "border-b border-gray-700"
                          : "border-b border-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            currentUser.profileImage ||
                            "https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"
                          }
                          alt="User"
                          className={`rounded-full w-10 h-10 object-cover border-2 ${
                            theme === "dark"
                              ? "border-gray-700"
                              : "border-purple-100"
                          }`}
                        />
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              theme === "dark"
                                ? "text-gray-200"
                                : "text-gray-800"
                            }`}
                          >
                            {currentUser.name}
                          </p>
                          <p
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            } truncate max-w-[150px]`}
                          >
                            {currentUser.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <NavLink
                        to="/dashboard"
                        className={`flex items-center px-4 py-2.5 text-sm ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                        }`}
                        onClick={() => setShowMenu(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 mr-3 ${
                            theme === "dark" ? "text-gray-500" : "text-gray-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        Dashboard
                      </NavLink>

                      {/* <NavLink
                        to="/"
                        className={`flex items-center px-4 py-2.5 text-sm ${
                          theme === "dark" 
                            ? "text-gray-300 hover:bg-gray-700 hover:text-purple-400" 
                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                        }`}
                        onClick={() => setShowMenu(false)}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 mr-3 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Practice Typing
                      </NavLink> */}

                      <NavLink
                        to="/about"
                        className={`flex items-center px-4 py-2.5 text-sm ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                        }`}
                        onClick={() => setShowMenu(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 mr-3 ${
                            theme === "dark" ? "text-gray-500" : "text-gray-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        About Us
                      </NavLink>

                      <hr
                        className={
                          theme === "dark"
                            ? "border-gray-700 my-1"
                            : "border-gray-100 my-1"
                        }
                      />

                      <button
                        onClick={logoutHandler}
                        className={`w-full text-left flex items-center px-4 py-2.5 text-sm ${
                          theme === "dark"
                            ? "text-red-400 hover:bg-gray-700"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
