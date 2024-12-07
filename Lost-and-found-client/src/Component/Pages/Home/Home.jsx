import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cover from "../../../assets/cover.jpg";
import Post from "../../../Post/PostCard/PostCard";

const Home = () => {
  const [dateType, setDateType] = useState("text");
  const [itemType, setItemType] = useState("lost");

  const handleDateFocus = () => setDateType("date");
  const handleDateBlur = () => setDateType("text");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", {
      category: e.target.category.value,
      location: e.target.location.value,
      date: e.target.date.value,
      type: itemType,
    });
  };

  return (
    <div>
      {/* Cover Image Section */}
      <div
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${cover})` }}
      >
        {/* Overlay for text and buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 text-center space-y-8">
          {/* Title Text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Find What You Lost, Return What You Found
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300">
            Your trusted platform to reconnect lost items with their rightful
            owners.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 w-full max-w-md">
            <NavLink
              to="/lost"
              className="w-1/2 px-6 py-3 text-sm sm:text-lg md:text-xl font-bold text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 rounded-md text-center"
            >
              Report for Lost
            </NavLink>
            <NavLink
              to="/found"
              className="w-1/2 px-6 py-3 text-sm sm:text-lg md:text-xl font-bold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 rounded-md text-center"
            >
              Report for Found
            </NavLink>
          </div>
        </div>
      </div>

      {/* Search Form Section */}
      <div className="px-4 sm:px-8 lg:px-32 py-8 bg-gray-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Search for Lost & Found Items
        </h2>
        <form onSubmit={handleSearch} className="flex justify-center gap-4">
          {/* Category Input */}
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="p-2 border rounded-lg focus:outline-none w-full lg:w-1/4 bg-white text-grey-800 border-[#0A97B0]"
          />

          {/* Location Input */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="p-2 border rounded-lg focus:outline-none w-full lg:w-1/4 bg-white text-grey-800 border-[#0A97B0]"
          />

          {/* Date Input */}
          <input
            type={dateType}
            name="date"
            placeholder="Date"
            className="p-2 border rounded-lg focus:outline-none w-full lg:w-1/4 bg-white text-grey-800 border-[#0A97B0]"
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
          />

          {/* Lost or Found Dropdown */}
          <select
            name="type"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none w-full lg:w-1/4 bg-white text-grey-800 border-[#0A97B0]"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          {/* Search Button */}
          <button
            type="submit"
            className="px-4 py-2 text-white bg-[#0A97B0] rounded-lg hover:bg-[#0A97B0] focus:outline-none w-full lg:w-auto"
          >
            Search
          </button>
        </form>
      </div>

      {/* Posts Section */}
      <div className="px-4 sm:px-8 lg:px-32 py-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">All Posts</h1>
        </div>
        <Post />
      </div>
    </div>
  );
};

export default Home;
