import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-8 text-center">
        {/* Envelope Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Registration Successful!
        </h2>

        <p className="text-gray-600 mb-2">
          A <strong>6-digit verification code</strong> has been sent to{" "}
          {email ? (
            <strong className="text-indigo-600">{email}</strong>
          ) : (
            "your email address"
          )}
          .
        </p>

        <p className="text-sm text-gray-500 mb-8">
          Enter the code on the next page to activate your account. The code
          expires in <strong>10 minutes</strong>. Check your spam folder if you
          don't see it.
        </p>

        <button
          onClick={() => navigate("/verifyEmail", { state: { email } })}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition w-full text-lg"
        >
          Enter Verification Code →
        </button>

        <button
          onClick={() => navigate("/login")}
          className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition"
        >
          I'll verify later
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
