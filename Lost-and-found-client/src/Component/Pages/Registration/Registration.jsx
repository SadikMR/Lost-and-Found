import React from 'react';

const Registration = () => {
    return (
        <div className="flex items-center justify-center bg-[#FAF7F0]">
            <div className="max-w-5xl bg-[#EADBC8] rounded-lg shadow-lg p-8">
                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-gray-800">Registration</h2>
                <p className="text-center text-gray-600 mt-2">Fill up the form to create your account</p>

                {/* Form */}
                <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-black">Full Name *</label>
                        <input
                            type="text"
                            id="fullname"
                            placeholder="Enter your full name"
                            required
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-black"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-black">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            required
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-black">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Enter your phone number"
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
                        />
                    </div>

                    {/* Division */}
                    <div>
                        <label htmlFor="division" className="block text-sm font-medium text-black">Division</label>
                        <input
                            type="text"
                            id="division"
                            placeholder="Enter your division"
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
                        />
                    </div>

                    {/* Zilla */}
                    <div>
                        <label htmlFor="zilla" className="block text-sm font-medium text-black">Zilla</label>
                        <input
                            type="text"
                            id="zilla"
                            placeholder="Enter your zilla"
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
                        />
                    </div>

                    {/* Upzilla */}
                    <div>
                        <label htmlFor="upzilla" className="block text-sm font-medium text-black">Upzilla</label>
                        <input
                            type="text"
                            id="upzilla"
                            placeholder="Enter your upzilla"
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
                        />
                    </div>

                    {/* Village */}
                    <div>
                        <label htmlFor="village" className="block text-sm font-medium text-black">Village</label>
                        <input
                            type="text"
                            id="village"
                            placeholder="Enter your village"
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-black">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm your password"
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label htmlFor="image" className="block text-sm font-medium text-black">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            className="bg-white mt-1 w-full p-2 border border-gray-300 rounded-lg text-white"
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