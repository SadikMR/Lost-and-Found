import React from 'react';

const Login = () => {
    return (
        <div className="flex items-center justify-center bg-[#FAF7F0] min-h-screen">
            <div className="w-full max-w-md bg-[#EADBC8] rounded-lg shadow-lg p-6">
                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <p className="text-center text-gray-600 mt-1">Welcome back! Please login to your account.</p>

                {/* Email Input */}
                <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        required
                        className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
                    />
                </div>

                {/* Password Input */}
                <div className="mt-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        required
                        className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black "
                    />

                </div>

                {/* Login Button */}
                <button className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Login
                </button>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                {/* Third-Party Login */}
                <div className="grid grid-cols-3 gap-4">
                    <button className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100 transition">
                        <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" />
                    </button>
                    <button className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100 transition">
                        <img src="https://img.icons8.com/fluency/24/facebook-new.png" alt="Facebook" />
                    </button>
                    <button className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-100 transition">
                        <img src="https://img.icons8.com/color/24/linkedin.png" alt="LinkedIn" />
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;