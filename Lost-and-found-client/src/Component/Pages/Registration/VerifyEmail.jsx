import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const endpoints = import.meta.env.VITE_backendUrl;

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${endpoints}/user/verifyEmail/${token}`)
      .then((res) => {
        setMessage(res.data.message);
        setTimeout(() => {
          navigate("/login"); // Redirect after 3 seconds
        }, 30000);
      })
      .catch(() => {
        setError("Email verification failed. Invalid or expired token.");
      });
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-full max-w-md">
        {/* Success Icon */}
        <svg
          className="w-16 h-16 text-green-500 mx-auto animate-bounce"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12a9.75 9.75 0 1117.563 6.477l2.312 2.311a.75.75 0 01-1.06 1.06l-2.313-2.311A9.75 9.75 0 112.25 12zm7.62 3.5a.75.75 0 001.06 0l5-5a.75.75 0 10-1.06-1.06l-4.47 4.47-2.44-2.44a.75.75 0 10-1.06 1.06l3 3z"
            clipRule="evenodd"
          />
        </svg>

        <h1 className="text-2xl font-bold mt-4">Email Verified!</h1>
        <p className="mt-2 text-lg text-green-600">
          Your email has been successfully verified.
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

export default VerifyEmail;
