import React from 'react';

const FoundPost = () => {
    return (
        <div className="flex items-center justify-center min-h-screen mb-5 ">
            <div className=" max-w-3xl rounded-lg shadow-lg p-8 bg-[#EADBC8]">
                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-gray-800">Found Form</h2>
                <p className="text-center text-gray-600 mt-2">Fill out the form to submit a new post</p>

                {/* Form */}
                <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-black">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            placeholder="Enter category"
                            className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Product Name */}
                    <div>
                        <label htmlFor="product-name" className="block text-sm font-medium text-black">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="product-name"
                            placeholder="Enter product name"
                            className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="possible-location" className="block text-sm font-medium text-black">
                            Location
                        </label>
                        <input
                            type="text"
                            id="possible-location"
                            placeholder="Enter location"
                            className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label htmlFor="possible-date" className="block text-sm font-medium text-black">
                            Date
                        </label>
                        <input
                            type="date"
                            id="possible-date"
                            className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-black">
                            Short Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Enter a short description"
                            className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                        ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="md:col-span-2">
                        <label htmlFor="image" className="block text-sm font-medium text-black">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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

export default FoundPost;