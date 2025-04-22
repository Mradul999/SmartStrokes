import React from 'react';
import userImage from '../assets/images/userProfile.png';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-4 bg-purple-700 text-white shadow-md">
      <div className="text-2xl font-bold tracking-wide">SmartStrokes</div>

      <div className="flex items-center gap-4">
        <button className="bg-white text-purple-700 font-semibold px-4 py-1 rounded hover:bg-purple-100 transition-all">
          Sign Up
        </button>
        <button className="bg-white text-purple-700 font-semibold px-4 py-1 rounded hover:bg-purple-100 transition-all">
          Sign In
        </button>
        <div className="w-10 h-10">
          <img
            src={userImage}
            alt="User"
            className="rounded-full w-full h-full object-cover border-2 border-white"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
