import { useState } from "react";
import Swal from "sweetalert2";

const endpoints = import.meta.env.VITE_backendUrl;

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            Swal.fire("Error", "Please enter your email", "error");
            return;
        }

        try {
            const response = await fetch(`${endpoints}/user/forgotPassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                throw new Error("Invalid response from server");
            }

            if (response.ok) {
                Swal.fire("Success", data.message, "success");
            } else {
                Swal.fire("Error", data.message || "Failed to send reset link", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", error.message || "Something went wrong", "error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blue-600 text-center mb-3">Forgot Password</h2>

                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="border p-2 mt-2 w-full rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button
                    onClick={handleForgotPassword}
                    className="bg-blue-600 text-white p-2 rounded-lg w-full mt-4 hover:bg-blue-700 transition"
                >
                    Send Reset Link
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
