import React, { useContext } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/logo.jpg";
import { AuthContext } from "../../../../AuthProviders/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handlelogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => { console.error(error) })
  }
  const navoptions = <>
    {
      user ? <><button onClick={handlelogOut} className="text-lg sm:text-xl font-bold text-red-700 hover:text-black hover:underline">logOut</button></> :
        <>
          <NavLink
            to="/login"
            className="text-lg sm:text-xl font-bold text-gray-700 hover:text-black hover:underline"
          >
            Login
          </NavLink>
        </>
    }
  </>
  return (
    <div className="h-auto w-full bg-white text-black border-b-2 border-gray-300">
      {/* Header Section */}
      <div className="px-4 sm:px-8 lg:px-32 py-8">
        <div className="flex flex-row justify-between items-start">
          {/* Website Name */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide mb-4 lg:mb-0 text-gray-800">
            <NavLink to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Lost & Found Logo" className="h-12 w-12" />
              <span className="text-3xl font-semibold text-[#0A97B0] hover:text-black">
                Lost & Found
              </span>
            </NavLink>
          </h1>

          {/* Profile & Login */}
          <div className="flex items-center space-x-5">
            {
              user ? (
                <span className="text-2xl sm:text-3xl">
                  <a href="/profile">
                    {user.displayName}
                  </a>
                </span>
              )
                :
                (
                  <span className="text-3xl sm:text-4xl">
                    <a>
                      <IoPersonCircleOutline />
                    </a>
                  </span>
                )
            }

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
