import React from "react";
import { Link } from "react-router-dom";
import lostItemImage from "../../assets/item.jpg"; // Adjust the path based on your directory structure

const Post = ({ posts }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-5">
      {posts.map((post) => (
        <div
          key={post._id}
          className="card card-compact bg-base-100 shadow-xl p-4"
        >
          <figure>
            {/* Using the image path from the post data */}
            <img
              src={post.imageUrl || lostItemImage} // Fallback to lostItemImage if no image URL is provided
              alt={post.category}
            />
          </figure>
          <div className="card-body">
            <h2 className="text-xl font-semibold">
              <span
                className={
                  post.type === "lost" ? "text-red-600" : "text-green-600"
                }
              >
                {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
              </span>{" "}
              <span className="text-buttonColor1">{post.category}</span>
            </h2>
            <p className="text-gray-300 font-semibold">
              {post.description || "Description not available."}
            </p>
            <ul className="text-sm text-gray-400">
              <li>
                <strong>Category:</strong> {post.category}
              </li>
              <li>
                <strong>Location:</strong> {post.possibleLocation}
              </li>
              <li>
                <strong>Date:</strong> {post.possibleDate}
              </li>
              <li>
                <strong>Color:</strong> {post.color}
              </li>
            </ul>
            <div className="card-actions justify-end">
              <button className="btn bg-buttonColor1 text-white hover:bg-buttonColor3 hover:scale-105 transition-all duration-300">
                <a href="/details">Show more</a>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
