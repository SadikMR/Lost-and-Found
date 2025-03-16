import React from "react";
import { NavLink } from "react-router-dom";

const ConfirmationPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex items-center justify-center text-white">
      <div className="bg-white max-w-lg w-full rounded-lg shadow-xl p-8 text-center transform transition-all hover:scale-105 hover:shadow-2xl">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v6m0 0l3-3m-3 3l-3-3m8-6a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold mb-4">
          Registration Successful!
        </h2>
        <p className="text-lg mb-6 text-gray-700">
          A confirmation email has been sent to your email address. Please check
          your inbox to confirm your email address and complete the registration
          process.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          If you don’t see the email, please check your spam or junk folder.
        </p>
        <div className="mt-6">
          <NavLink
            to="/login"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg text-lg font-medium transition duration-300 ease-in-out transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Back to Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
