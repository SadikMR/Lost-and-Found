import React, { useContext, useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import logo from "../../../../assets/logo.jpg";
import { AuthContext } from "../../../../AuthProviders/AuthProvider";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handlelogOut = () => {
    logOut()
      .then(() => { })
      .catch((error) => {
        console.error(error);
      });
  };

  const navoptions = (
    <>
      {user ? (
        <>
          <button
            onClick={handlelogOut}
            className="text-lg sm:text-xl font-bold  text-red-700 hover:text-black hover:underline"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <NavLink
            to="/login"
            className="text-lg sm:text-xl font-bold text-gray-700 hover:text-black hover:underline"
          >
            Login
          </NavLink>
        </>
      )}
    </>
  );
  return (
    <div className="h-auto w-full bg-white text-black border-b-2 border-gray-300">
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-16 xl:px-32 py-4 sm:py-6">
        <div className="flex flex-row justify-between items-center">
          {/* Website Name */}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide text-gray-800">
            <NavLink to="/" className="flex items-center space-x-2">
              {/* Logo with responsive size */}
              <img src={logo} alt="Lost & Found Logo" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#0A97B0] hover:text-black">
                Lost & Found
              </span>
            </NavLink>
          </h1>

          {/* Profile & Login */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {user ? (
              <div className="flex items-center space-x-3 sm:space-x-5">
                <NavLink to="/conversations">
                  <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </NavLink>
                <span className="text-sm sm:text-lg md:text-3xl">
                  <NavLink to="/profile">{user.displayName}</NavLink>
                </span>
              </div>
            ) : (
              <span className="text-xl sm:text-2xl">
                <a>
                  <IoPersonCircleOutline />
                </a>
              </span>
            )}

            {navoptions}
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="border-t-2 border-gray-300 w-full"></div>
    </div>
  );
};

export default Navbar;
