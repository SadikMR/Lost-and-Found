import { React, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import pic1 from "../../assets/item.jpg";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthProviders/AuthProvider";
import axios from "axios";

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
          JSON.stringify(senderInfo)
        )}&receiverInfo=${encodeURIComponent(JSON.stringify(receiverInfo))}`,
      });
    }
  };

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-4 bg-[#E5E1DA] text-black shadow-md rounded-lg p-6">
        {/* Left Column */}
        <div className="col-span-2">
          <img
            src={post.image || pic1}
            alt="Shoes"
            className="w-full h-64 object-cover rounded-md"
          />
          <div className="mt-4 space-y-3">
            <h2 className="text-xl font-bold">{post.productName}</h2>
            <p>
              <span className="font-semibold">Category:</span> {post.category}
            </p>
            <p>
              <span className="font-semibold">Brand:</span> {post.brand}
            </p>
            <p>
              <span className="font-semibold">Color:</span> {post.color}
            </p>
            <p>
              <span className="font-semibold">Location:</span>
              {post.division}, {post.zilla}, {post.upzilla}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {post.possibleDate}
            </p>
            <p>
              <span className="font-semibold">Description:</span>
              {post.description}
            </p>
          </div>
        </div>

        {/* Right Column: Receiver Info */}
        <div className="space-y-6">
          {/* Receiver Info Header */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            {/* Name and Verified Badge in one row */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                {receiverInfo?.data?.fullname}
              </h2>
              <div className="flex items-center text-sm text-blue-500">
                <CheckBadgeIcon className="w-4 h-4" />
                <span className="font-small">Verified</span>
              </div>
            </div>

            {/* Member Since */}
            <div className="mt-2 text-sm text-gray-500">
              <p className="font-medium">
                Member Since: {formatDate(receiverInfo?.data?.createdAt)}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-4 border-2 border-blue-400 rounded-lg shadow-sm">
            <p className="font-semibold text-lg text-gray-700">
              Contact Information
            </p>
            <div className="mt-4 space-y-3">
              <p>
                <span className="font-semibold text-gray-800">Phone:</span>{" "}
                {receiverInfo?.data?.phone}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Email:</span>{" "}
                {receiverInfo?.data?.email}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Address:</span>{" "}
                {receiverInfo?.data?.zilla}
              </p>
            </div>

            {/* Chat Now Button */}
            <div className="flex gap-2 items-center justify-between mt-6">
              <button
                onClick={handleClick}
                className={`flex items-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading || !senderInfo || !receiverInfo
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={loading || !senderInfo || !receiverInfo}
              >
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-white" />
                <p className="font-semibold">Chat Now</p>
              </button>
            </div>
          </div>

          {/* Display error message if exists */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Details;
