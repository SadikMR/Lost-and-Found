import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const endpoints = import.meta.env.VITE_backendUrl; // ✅ Added missing endpoint variable

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (!password.trim() || password.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters long.", "error");
      return;
    }

    try {
      const response = await fetch(`${endpoints}/user/resetPassword/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error("Invalid response from server");
      }

      if (response.ok) {
        Swal.fire("Success", data.message, "success");
        navigate("/login");
      } else {
        Swal.fire("Error", data.message || "Failed to reset password", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-3">Reset Password</h2>

        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter new password"
          className="border p-2 mt-2 w-full rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          onClick={handleResetPassword}
          className="bg-blue-600 text-white p-2 rounded-lg w-full mt-4 hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
