import React from "react";
import { NavLink } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5"; // You can use any notification icon here

const Notification = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-center items-center">
          <IoNotificationsOutline className="w-16 h-16 text-gray-500 mb-4" />
        </div>
        <h2 className="text-2xl text-center font-semibold text-gray-700 mb-4">
          You have no notifications
        </h2>
        <p className="text-center text-gray-500">
          Currently, there are no new updates or notifications for you.
        </p>
        <div className="flex justify-center mt-6">
          <NavLink
            to="/"
            className="text-lg text-[#0A97B0] hover:text-black hover:underline"
          >
            Go to Homepage
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Notification;
