import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const endpoints = import.meta.env.VITE_backendUrl;

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Email may be passed from the confirmation/registration page via router state
  const [email, setEmail] = useState(location.state?.email || "");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !code.trim()) {
      setError("Please enter both your email and the verification code.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${endpoints}/user/verifyEmail`, {
        email: email.trim(),
        code: code.trim(),
      });
      setSuccess(res.data.message || "Email verified successfully!");
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email.trim()) {
      setError("Please enter your email address first.");
      return;
    }
    setResending(true);
    setResendMsg("");
    setError("");
    try {
      const res = await axios.post(`${endpoints}/user/resendVerificationCode`, {
        email: email.trim(),
      });
      setResendMsg(res.data.message || "New code sent! Check your inbox.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to resend code. Try again."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-indigo-600"
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

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Verify Your Email
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter the 6-digit code we sent to your email address.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2 mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-2 mb-4">
            {success} Redirecting to login…
          </div>
        )}
        {resendMsg && (
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm rounded-lg px-4 py-2 mb-4">
            {resendMsg}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="e.g. 482931"
              maxLength={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm tracking-widest text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Verifying…" : "Verify Email"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Didn't receive a code?{" "}
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-indigo-600 hover:underline font-medium disabled:opacity-60"
          >
            {resending ? "Sending…" : "Resend Code"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
