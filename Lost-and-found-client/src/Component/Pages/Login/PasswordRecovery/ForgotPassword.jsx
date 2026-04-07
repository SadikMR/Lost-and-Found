import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const endpoints = import.meta.env.VITE_backendUrl;

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Step 1: email input  |  Step 2: code input
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Step 1: send code ───────────────────────
  const handleSendCode = async () => {
    if (!email.trim()) {
      Swal.fire("Error", "Please enter your email address.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${endpoints}/user/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire(
          "Code Sent!",
          "Check your inbox for a 6-digit reset code.",
          "success"
        );
        setStep(2);
      } else {
        Swal.fire("Error", data.message || "Failed to send reset code.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: verify code ──────────────────────
  const handleVerifyCode = async () => {
    if (!code.trim() || code.length !== 6) {
      Swal.fire("Error", "Please enter the 6-digit code.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${endpoints}/user/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      const data = await response.json();

      if (response.ok) {
        // Navigate to reset password page, passing email via state (no token in URL)
        navigate("/login/resetPassword", { state: { email: email.trim() } });
      } else {
        Swal.fire("Error", data.message || "Invalid or expired code.", "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          {step === 1
            ? "Enter your email and we'll send you a reset code."
            : `Enter the 6-digit code sent to ${email}`}
        </p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-red-500" : "bg-gray-200"}`} />
          <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-red-500" : "bg-gray-200"}`} />
        </div>

        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="border border-gray-300 p-2.5 w-full rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              onClick={handleSendCode}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2.5 rounded-lg w-full mt-4 transition disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Reset Code"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              placeholder="e.g. 482931"
              maxLength={6}
              className="border border-gray-300 p-2.5 w-full rounded-lg text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-red-400"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              required
            />
            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold p-2.5 rounded-lg w-full mt-4 transition disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify Code"}
            </button>
            <button
              onClick={() => setStep(1)}
              className="mt-3 text-sm text-gray-400 hover:text-gray-600 w-full text-center transition"
            >
              ← Change email address
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
