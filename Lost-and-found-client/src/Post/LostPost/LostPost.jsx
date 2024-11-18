import React from 'react';

const LostPost = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-gray-800">Lost Form</h2>
                <p className="text-center text-gray-600 mt-2">Fill out the form to submit a new post</p>

                {/* Form */}
                <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            placeholder="Enter category"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Product Name */}
                    <div>
                        <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="product-name"
                            placeholder="Enter product name"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Color */}
                    <div>
                        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                            Color
                        </label>
                        <input
                            type="text"
                            id="color"
                            placeholder="Enter color"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Brand */}
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                            Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            placeholder="Enter brand"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Possible Location */}
                    <div>
                        <label htmlFor="possible-location" className="block text-sm font-medium text-gray-700">
                            Possible Location
                        </label>
                        <input
                            type="text"
                            id="possible-location"
                            placeholder="Enter possible location"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Possible Date */}
                    <div>
                        <label htmlFor="possible-date" className="block text-sm font-medium text-gray-700">
                            Possible Date
                        </label>
                        <input
                            type="date"
                            id="possible-date"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Short Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter a short description"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </form>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Submit Post
                </button>
            </div>
        </div>
    );
};

export default LostPost;