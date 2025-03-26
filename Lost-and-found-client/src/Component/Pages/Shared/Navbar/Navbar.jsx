import React, { useContext, useState, useEffect } from "react";
import { IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import logo from "../../../../assets/logo.jpg";
import { AuthContext } from "../../../../AuthProviders/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userImage, setUserImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("user"));
    if (storedUserInfo && storedUserInfo.image) {
      setUserImage(storedUserInfo.image);
    }
  }, []);

  const handlelogOut = () => {
    logOut()
      .then(() => {
        localStorage.clear();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="h-auto w-full bg-white text-black border-b-2 border-gray-300">
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-16 xl:px-32 py-4 sm:py-6">
        <div className="flex flex-row justify-between items-center">
          {/* Website Logo */}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold tracking-wide text-gray-800">
            <NavLink to="/" className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Lost & Found Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
              />
              <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold text-[#0A97B0] hover:text-black">
                Lost & Found
              </span>
            </NavLink>
          </h1>

          {/* Right Section: Notification, Chat, Profile */}
          {user ? (
            <div className="flex items-center space-x-6 sm:space-x-7 md:space-x-11">
              {/* Notification Icon */}
              <NavLink to="/notification">
                <BellIcon className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-gray-700 hover:text-black transition-all duration-300" />
              </NavLink>

              {/* Chat Icon */}
              <NavLink to="/conversations">
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-gray-700 hover:text-black transition-all duration-300" />
              </NavLink>

              {/* User Profile Image */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="focus:outline-none"
                >
                  <img
                    src={userImage || "/path/to/default/image.jpg"}
                    alt="User Profile"
                    className="w-10 h-10 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-16 lg:h-16 xl:w-17 xl:h-17 rounded-full border-2 border-[#0A97B0] transition-all duration-300"
                  />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm sm:text-lg md:text-xl"
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={handlelogOut}
                      className="flex w-full px-4 py-2 text-red-700 hover:bg-gray-100 text-sm sm:text-md md:text-lg"
                    >
                      <IoLogOutOutline className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center space-x-2 text-xl sm:text-xl md:text-2xl font-bold text-gray-700 hover:text-black hover:underline transition-all"
            >
              <IoPersonCircleOutline className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />{" "}
              {/* Responsive Login Icon */}
              <span>Login</span> {/* Text next to the icon */}
            </NavLink>
          )}
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="border-t-2 border-gray-300 w-full"></div>
    </div>
  );
};

export default Navbar;
