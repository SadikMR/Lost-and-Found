import React from 'react';

const EditProfile = () => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
            <form className="space-y-4">
                {/* Full Name */}
                <div className=''>
                    <label className="block text-sm font-semibold text-black">
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your full name"
                        className="text-black bg-gray-200 mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* User Name */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        User Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="text-black bg-gray-200 mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Division */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Division
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your division"
                        className="text-black bg-gray-200 mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Zilla */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Zilla
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your zilla"
                        className="text-black bg-gray-200 mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Upzilla */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Upzilla
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your upzilla"
                        className="text-black bg-gray-200 mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Village */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Village
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your village"
                        className="text-black bg-gray-200 mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your contact number"
                        className="text-black bg-gray-200 mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="text-black bg-gray-200 mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditProfile;