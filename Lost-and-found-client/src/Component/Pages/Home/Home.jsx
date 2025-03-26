import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import cover from "../../../assets/cover.jpg";
import Post from "../../../Post/PostCard/PostCard";

const endpoints = import.meta.env.VITE_backendUrl;

const Home = () => {
  const [dateType, setDateType] = useState("text");
  const [itemType, setItemType] = useState("lost");
  const [searchResults, setSearchResults] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]); // Add state for recent lost posts
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 9;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateFocus = () => setDateType("date");
  const handleDateBlur = () => setDateType("text");

  // Fetch recent lost and found posts by default
  const fetchRecentPosts = async () => {
    try {
      const lostResponse = await fetch(`${endpoints}/posts/lost`);
      const foundResponse = await fetch(`${endpoints}/posts/found`);

      if (lostResponse.ok && foundResponse.ok) {
        const lostData = await lostResponse.json();
        const foundData = await foundResponse.json();

        const mixedPosts = [...lostData.data, ...foundData.data];

        mixedPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setRecentPosts(mixedPosts);
      } else {
        console.error("Failed to fetch recent posts");
      }
    } catch (error) {
      console.error("Error during fetching recent posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const searchParams = {};

    // Conditionally add search parameters based on selected fields
    if (e.target.category.value) {
      searchParams.category = e.target.category.value;
    }
    if (e.target.location.value) {
      searchParams.zilla = e.target.location.value;
    }
    if (e.target.date.value) {
      searchParams.possibleDate = e.target.date.value; // Send the date as a string (e.g., '2025-03-07')
    }

    const itemType = e.target.type.value || "lost";
    const query = new URLSearchParams(searchParams).toString();

    const searchUrl =
      itemType === "lost"
        ? `${endpoints}/posts/lost/search?${query}`
        : `${endpoints}/posts/found/search?${query}`;

    try {
      const response = await fetch(searchUrl);

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);

        // Handle search results (store in state or context)
        setSearchResults(data.data);

        if (data.data.length > 0) {
          const firstResult = data.data[0]; // Assuming you want the first result
          console.log(
            `${firstResult.category}, ${firstResult.possibleLocation}`
          );
        } else {
          alert("No results found");
        }
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    // Fetch recent posts when component mounts
    fetchRecentPosts();
  }, []);
  // Determine which posts to show based on pagination
  const allPosts = searchResults.length > 0 ? searchResults : recentPosts;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const displayedPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  // Handle Next Page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handle Previous Page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      {/* Cover Image Section */}
      <div
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4 text-center space-y-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Find What You Lost, Return What You Found
          </h1>
          <p className="text-md sm:text-xl md:text-2xl lg:text-3xl text-gray-300">
            Your trusted platform to reconnect lost items with their rightful
            owners.
          </p>

          <div className="flex gap-4 w-full max-w-md">
            <NavLink
              to="/lost"
              className="w-1/2 px-6 py-3 text-xs sm:text-sm md:text-lg font-bold text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 rounded-md text-center"
            >
              Report for Lost
            </NavLink>
            <NavLink
              to="/found"
              className="w-1/2 px-6 py-3 text-xs sm:text-sm md:text-lg font-bold text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 rounded-md text-center"
            >
              Report for Found
            </NavLink>
          </div>
        </div>
      </div>

      {/* Search Form Section */}
      <div className="px-4 sm:px-8 lg:px-32 py-8 bg-gray-100">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Search for Lost & Found Items
        </h2>

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          <select
            id="category"
            name="category"
            placeholder="Category"
            className="p-2 border rounded-lg focus:outline-none w-full bg-white text-black placeholder-gray-400 border-[#0A97B0]"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Cloths">Cloths</option>
            <option value="Property">Property</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Educations">Educations</option>
            <option value="Sports">Sports</option>
            <option value="Animals">Animals</option>
            <option value="Foods">Foods</option>
            <option value="Others">Others</option>
          </select>

          <select
            id="location"
            name="location"
            placeholder="Location"
            className="p-2 border rounded-lg focus:outline-none w-full bg-white text-black placeholder-gray-400 border-[#0A97B0]"
          >
            <option value="" disabled selected hidden>
              Select Location
            </option>
            <option value="Bagerhat">Bagerhat</option>
            <option value="Barguna">Barguna</option>
            <option value="Bhola">Bhola</option>
            <option value="Bogra">Bogura</option>
            <option value="Brahmanbaria">Brahmanbaria</option>
            <option value="Chandpur">Chandpur</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Chuadanga">Chuadanga</option>
            <option value="Cox's Bazar">Cox's Bazar</option>
            <option value="Dinajpur">Dinajpur</option>
            <option value="Faridpur">Faridpur</option>
            <option value="Feni">Feni</option>
            <option value="Gaibandha">Gaibandha</option>
            <option value="Gazipur">Gazipur</option>
            <option value="Gopalganj">Gopalganj</option>
            <option value="Habiganj">Habiganj</option>
            <option value="Jamalpur">Jamalpur</option>
            <option value="Jashore">Jashore</option>
            <option value="Jhenaidah">Jhenaidah</option>
            <option value="Joypurhat">Joypurhat</option>
            <option value="Khagrachari">Khagrachari</option>
            <option value="Khulna">Khulna</option>
            <option value="Kishoreganj">Kishoreganj</option>
            <option value="Kurigram">Kurigram</option>
            <option value="Lakshmipur">Lakshmipur</option>
            <option value="Lalmonirhat">Lalmonirhat</option>
            <option value="Madaripur">Madaripur</option>
            <option value="Magura">Magura</option>
            <option value="Manikganj">Manikganj</option>
            <option value="Meherpur">Meherpur</option>
            <option value="Moulvibazar">Moulvibazar</option>
            <option value="Munshiganj">Munshiganj</option>
            <option value="Mymensingh">Mymensingh</option>
            <option value="Naogaon">Naogaon</option>
            <option value="Narayanganj">Narayanganj</option>
            <option value="Narsingdi">Narsingdi</option>
            <option value="Netrokona">Netrokona</option>
            <option value="Nilphamari">Nilphamari</option>
            <option value="Pabna">Pabna</option>
            <option value="Panchagarh">Panchagarh</option>
            <option value="Patuakhali">Patuakhali</option>
            <option value="Pirojpur">Pirojpur</option>
            <option value="Rajbari">Rajbari</option>
            <option value="Rajshahi">Rajshahi</option>
            <option value="Rangamati">Rangamati</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Satkhira">Satkhira</option>
            <option value="Shariatpur">Shariatpur</option>
            <option value="Sherpur">Sherpur</option>
            <option value="Sirajganj">Sirajganj</option>
            <option value="Sunamganj">Sunamganj</option>
            <option value="Sylhet">Sylhet</option>
            <option value="Tangail">Tangail</option>
            <option value="Thakurgaon">Thakurgaon</option>
            <option value="Barishal">Barishal</option>
            <option value="Madaripur">Madaripur</option>
            <option value="Manikganj">Manikganj</option>
            <option value="Narayanganj">Narayanganj</option>
            <option value="Narsingdi">Narsingdi</option>
            <option value="Netrakona">Netrakona</option>
            <option value="Panchagarh">Panchagarh</option>
            <option value="Pabna">Pabna</option>
            <option value="Patuakhali">Patuakhali</option>
            <option value="Pirojpur">Pirojpur</option>
            <option value="Rangpur">Rangpur</option>
            <option value="Rajshahi">Rajshahi</option>
          </select>

          <input
            type={dateType}
            name="date"
            id="date"
            placeholder="Date"
            className="p-2 border rounded-lg focus:outline-none w-full bg-white text-black placeholder-gray-400 border-[#0A97B0]"
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
          />

          <select
            name="type"
            id="type"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none w-full bg-white text-black placeholder-gray-400 border-[#0A97B0]"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 text-white bg-[#0A97B0] rounded-lg hover:bg-[#087F90] focus:outline-none w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Posts Section */}
      <div className="px-4 sm:px-8 lg:px-32 py-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">All Posts</h1>
        </div>

        {/* Render paginated posts */}
        <div className="relative min-h-screen">
          {loading ? (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4">
              <div className="text-2xl text-gray-700">Loading...</div>
            </div>
          ) : (
            <Post posts={displayedPosts} /> // Render posts once loading is complete
          )}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          {currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              ← Previous
            </button>
          )}

          {currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
