import React from "react";
// import userImage from '../assets/images/userProfile.png';
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-4 bg-purple-700 text-white shadow-md">
      <NavLink to="/">
        <div className="text-2xl font-bold tracking-wide">TypeMaster</div>
      </NavLink>

      <div className="flex items-center gap-4">
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

        <div className="w-10 h-10">
          <img
            // src={userImage}
            alt="User"
            className="rounded-full w-full h-full object-cover border-2 border-white"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
