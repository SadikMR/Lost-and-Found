import React from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import pic1 from "../../assets/item.jpg";
import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const { post } = location.state || {};

  console.log("post is :", post);
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
              {post.possibleLocation}
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

        {/* Right Column */}
        <div className="flex flex-col ">
          <div>
            <div className="flex items-center gap-2">
              <CheckBadgeIcon className="w-6 h-6 text-blue-500" />
              <span>Verified</span>
            </div>
            <p>Member since january, 2020</p>
          </div>
          <div className="border-2 p-2 m-2 border-blue-400 rounded-lg ">
            <p className="font-semibold text-lg">Contact Information</p>
            <p className="mt-2">
              <span className="font-semibold">Phone:</span> 01613******
            </p>
          </div>
          <div className="flex gap-2 m-2 items-center">
            <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-blue-700" />
            <p className="font-semibold">Chat Now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
