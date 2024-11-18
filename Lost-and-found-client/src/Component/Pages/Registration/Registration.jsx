import React from 'react';

const Registration = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-gray-800">Registration</h2>
                <p className="text-center text-gray-600 mt-2">Fill up the form to create your account</p>

                {/* Form */}
                <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="Enter your full name"
                            required
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            required
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Enter your phone number"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Division */}
                    <div>
                        <label htmlFor="division" className="block text-sm font-medium text-gray-700">Division</label>
                        <input
                            type="text"
                            id="division"
                            placeholder="Enter your division"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Zilla */}
                    <div>
                        <label htmlFor="zilla" className="block text-sm font-medium text-gray-700">Zilla</label>
                        <input
                            type="text"
                            id="zilla"
                            placeholder="Enter your zilla"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Upzilla */}
                    <div>
                        <label htmlFor="upzilla" className="block text-sm font-medium text-gray-700">Upzilla</label>
                        <input
                            type="text"
                            id="upzilla"
                            placeholder="Enter your upzilla"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Village */}
                    <div>
                        <label htmlFor="village" className="block text-sm font-medium text-gray-700">Village</label>
                        <input
                            type="text"
                            id="village"
                            placeholder="Enter your village"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm your password"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </form>

                {/* Register Button */}
                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Register
                </button>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account? Please <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Registration;