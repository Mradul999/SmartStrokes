import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import authStore from "../store/store.js";
import axios from "axios";

const Header = () => {
  const currentUser = authStore((state) => state.currentUser);
  const logout = authStore((state) => state.logout);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef();

  // Handle scrolling effect
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

  // Check if the route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-gradient-to-r from-purple-600 to-indigo-600 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center">
            <div className={`flex items-center ${scrolled ? "text-purple-600" : "text-white"}`}>
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
              <span className="text-2xl font-bold tracking-tight">TypeMaster</span>
            </div>
          </NavLink>

          <div className="flex items-center gap-2 md:gap-4">
            {/* About link - visible to all users */}
            <NavLink 
              to="/about" 
              className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                scrolled 
                  ? isActive("/about") 
                    ? "bg-purple-600 text-white"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100" 
                  : isActive("/about")
                    ? "bg-white text-purple-700"
                    : "bg-purple-500/30 text-white hover:bg-purple-500/50"
              }`}
            >
              About
            </NavLink>
            
            {/* Contact link - visible to all users */}
            <NavLink 
              to="/contact" 
              className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                scrolled 
                  ? isActive("/contact") 
                    ? "bg-purple-600 text-white"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100" 
                  : isActive("/contact")
                    ? "bg-white text-purple-700"
                    : "bg-purple-500/30 text-white hover:bg-purple-500/50"
              }`}
            >
              Contact
            </NavLink>
            
            {!currentUser ? (
              <>
                <NavLink 
                  to="/signup" 
                  className={`hidden sm:flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    scrolled 
                      ? isActive("/signup") 
                        ? "bg-purple-600 text-white"
                        : "bg-purple-50 text-purple-700 hover:bg-purple-100" 
                      : isActive("/signup")
                        ? "bg-white text-purple-700"
                        : "bg-purple-500/30 text-white hover:bg-purple-500/50"
                  }`}
                >
                  Sign Up
                </NavLink>
                <NavLink 
                  to="/signin" 
                  className={`flex items-center py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    scrolled 
                      ? isActive("/signin") 
                        ? "bg-purple-600 text-white" 
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200" 
                      : isActive("/signin")
                        ? "bg-white text-purple-700"
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
                    scrolled ? "hover:bg-gray-100" : "hover:bg-purple-500/30"
                  }`}
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  <div className="hidden md:block">
                    <p className={`text-sm font-medium ${scrolled ? "text-gray-700" : "text-white"}`}>
                      {currentUser.name && currentUser.name.split(" ")[0]}
                    </p>
                    <p className={`text-xs ${scrolled ? "text-gray-500" : "text-purple-200"}`}>
                      View dashboard
                    </p>
                  </div>
                  <div className="relative w-9 h-9">
                    <img
                      src={
                        currentUser.profilePic ||
                        "https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"
                      }
                      alt="User"
                      className="rounded-full w-full h-full object-cover border-2 shadow-sm"
                      style={{ borderColor: scrolled ? "#e5e7eb" : "#ffffff" }}
                    />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 bg-green-400 ${
                      scrolled ? "border-white" : "border-purple-600"
                    }`}></div>
                  </div>
                </div>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg overflow-hidden z-50 border border-gray-100">
                    <div className="p-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            currentUser.profilePic ||
                            "https://cdn.vectorstock.com/i/1000v/95/56/user-profile-icon-avatar-or-person-vector-45089556.jpg"
                          }
                          alt="User"
                          className="rounded-full w-10 h-10 object-cover border-2 border-purple-100"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[150px]">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <NavLink
                        to="/dashboard"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                        onClick={() => setShowMenu(false)}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-3 text-gray-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                      </NavLink>
                      <NavLink
                        to="/"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                        onClick={() => setShowMenu(false)}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-3 text-gray-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Practice Typing
                      </NavLink>
                      <NavLink
                        to="/about"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                        onClick={() => setShowMenu(false)}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-3 text-gray-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        About Us
                      </NavLink>
                      <NavLink
                        to="/contact"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                        onClick={() => setShowMenu(false)}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-3 text-gray-400" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Us
                      </NavLink>
                    </div>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={logoutHandler}
                        className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 mr-3 text-red-500" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
