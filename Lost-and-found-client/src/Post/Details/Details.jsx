import { React, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Flag } from "lucide-react"; // Report icon
import { MoreVertical } from "lucide-react";
import pic1 from "../../assets/item.jpg";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthProviders/AuthProvider";
import axios from "axios";
import ReportModal from "./reportPostModal";

const endpoints = import.meta.env.VITE_backendUrl;

const Details = () => {
  const { getCurrentUser } = useContext(AuthContext);
  const user = getCurrentUser();
  const location = useLocation();
  const { post } = location.state || {};
  const senderID = user.uid;
  const receiverID = post.firebase_uid;

  const [receiverInfo, setReceiverInfo] = useState(null);
  const [senderInfo, setSenderInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showMenu, setShowMenu] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const senderResponse = await axios.get(
          `${endpoints}/user/getInfo/${senderID}`
        );
        setSenderInfo(senderResponse.data);

        const receiverResponse = await axios.get(
          `${endpoints}/user/getInfo/${receiverID}`
        );
        setReceiverInfo(receiverResponse.data);
      } catch (error) {
        console.log("Error fetching data");
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [senderID, receiverID]);

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (loading || !senderInfo || !receiverInfo) {
      e.preventDefault();
      alert("Please wait until the information is fully loaded.");
    } else {
      navigate({
        pathname: "/chat",
        search: `?senderID=${senderID}&receiverID=${receiverID}&senderInfo=${encodeURIComponent(
          JSON.stringify(senderInfo.data)
        )}&receiverInfo=${encodeURIComponent(
          JSON.stringify(receiverInfo.data)
        )}`,
      });
    }
  };

  const receiverDataId = receiverInfo?.data?._id;
  console.log("receiverDataId 12", receiverDataId);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Profile URL copied! 📋");
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#E5E1DA] text-black shadow-md rounded-lg p-6">
        {/* Left Column: Post Details */}
        <div className="col-span-1 md:col-span-2">
          <img
            src={post.image || pic1}
            alt="Shoes"
            className="w-full md:w-80 h-64 object-cover rounded-md"
          />
          <div className="mt-4 space-y-3">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
              {post.productName}
            </h2>
            <p className="text-base md:text-lg lg:text-xl">
              <span className="font-semibold">Category:</span> {post.category}
            </p>
            <p className="text-base md:text-lg lg:text-xl">
              <span className="font-semibold">Brand:</span> {post.brand}
            </p>
            <p className="text-base md:text-lg lg:text-xl">
              <span className="font-semibold">Color:</span> {post.color}
            </p>
            <p className="text-base md:text-lg lg:text-xl">
              <span className="font-semibold">Location:</span>
              {post.division}, {post.zilla}, {post.upzilla}
            </p>
            <p className="text-base md:text-lg lg:text-xl">
              <span className="font-semibold">Date:</span> {post.possibleDate}
            </p>
            <p className="text-base md:text-lg lg:text-xl">
              <span className="font-semibold">Description:</span>
              {post.description}
            </p>
          </div>
        </div>

        {/* Right Column: Receiver Info */}
        <div className="space-y-6 w-full md:w-auto">
          {/* Receiver Info Header */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Name and Verified Badge in one row */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-2">
              <NavLink
                to={`/details/otherProfile/${receiverDataId}`}
                state={{ receiverInfo }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 text-center sm:text-left"
              >
                <h2>{receiverInfo?.data?.fullname}</h2>
              </NavLink>

              {/* Three-dot menu */}
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <MoreVertical size={22} />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white border rounded-lg shadow-lg z-10">
                    <button
                      className="px-4 py-2 w-full text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
                      onClick={() => {
                        setShowReport(true);
                        setShowMenu(false);
                      }}
                    >
                      Report Post
                    </button>
                    <button
                      className="px-4 py-2 w-full text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
                      onClick={() => setShowMenu(false)}
                    >
                      View Profile
                    </button>
                    <button
                      className="px-4 py-2 w-full text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
                      onClick={handleCopyURL}
                    >
                      Copy URL
                    </button>
                    <button
                      className="px-4 py-2 w-full text-gray-700 hover:bg-gray-100 text-sm sm:text-base"
                      onClick={() => setShowMenu(false)}
                    >
                      Chat
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Member Since */}
            <div className="mt-2 text-sm md:text-base lg:text-lg text-gray-500 text-center sm:text-left">
              <p className="font-medium">
                Member Since: {formatDate(receiverInfo?.data?.createdAt)}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-4 border-2 border-blue-400 rounded-lg shadow-sm">
            <p className="font-semibold text-base sm:text-lg lg:text-xl text-gray-700 text-center sm:text-left">
              Contact Information
            </p>
            <div className="mt-4 space-y-2 sm:space-y-3 text-center sm:text-left">
              <p className="flex flex-wrap break-words min-w-0 text-base sm:text-lg lg:text-xl">
                <span className="font-semibold text-gray-800">Phone:</span>{" "}
                <span className="ml-1 break-all">
                  {receiverInfo?.data?.phone}
                </span>
              </p>
              <p className="flex flex-wrap break-words min-w-0 text-base sm:text-lg lg:text-xl">
                <span className="font-semibold text-gray-800">Email:</span>{" "}
                <span className="ml-1 break-all">
                  {receiverInfo?.data?.email}
                </span>
              </p>
              <p className="flex flex-wrap break-words min-w-0 text-base sm:text-lg lg:text-xl">
                <span className="font-semibold text-gray-800">Address:</span>{" "}
                <span className="ml-1 break-words">
                  {receiverInfo?.data?.zilla}
                </span>
              </p>
            </div>

            {/* Chat Now Button */}
            <div className="flex flex-col sm:flex-row gap-2 items-center justify-center sm:justify-between mt-6">
              <button
                onClick={handleClick}
                className={`flex items-center gap-2 p-3 w-full sm:w-auto justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading || !senderInfo || !receiverInfo
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={loading || !senderInfo || !receiverInfo}
              >
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-white" />
                <p className="font-semibold text-base sm:text-lg lg:text-xl">
                  Chat Now
                </p>
              </button>
            </div>
          </div>

          {/* Report Modal */}
          {showReport && (
            <ReportModal
              postId={post._id}
              postType={post.type}
              reporterUserId={receiverID}
              onClose={() => setShowReport(false)}
            />
          )}

          {/* Display error message if exists */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Details;
