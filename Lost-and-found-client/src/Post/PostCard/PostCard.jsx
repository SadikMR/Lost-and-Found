import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lostItemImage from "../../assets/item.jpg";
import VerificationModal from "../VerificationModal"; // Import the modal

const Post = ({ posts }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleShowMore = (post) => {
    if (post.type === "found") {
      setSelectedPost(post);
      setModalOpen(true);
    } else {
      navigate("/details", { state: { post } });
    }
  };

  const handleVerificationSuccess = () => {
    navigate("/details", { state: { post: selectedPost } });
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-5">
      {posts.map((post) => (
        <div
          key={post._id}
          className="card card-compact bg-base-100 shadow-xl p-4"
        >
          <figure>
            <img src={post.imageUrl || lostItemImage} alt={post.category} />
          </figure>
          <div className="card-body">
            <h2 className="text-xl font-semibold">
              <span
                className={
                  post.type === "lost"
                    ? "text-red-600 text-2xl"
                    : "text-green-600 text-2xl"
                }
              >
                {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
              </span>{" "}
              <span className="text-2xl text-buttonColor1">
                {post.productName}
              </span>
            </h2>

            <ul className="text-lg text-gray-400">
              <li>
                <strong>Category:</strong> {post.category}
              </li>
              <li>
                <strong>Location:</strong> {post.possibleLocation}
              </li>
              <li>
                <strong>Date:</strong> {post.possibleDate}
              </li>
            </ul>
            <div className="card-actions justify-end">
              <button
                className="btn bg-buttonColor1 text-white text-md hover:bg-buttonColor3 hover:scale-105 transition-all duration-300"
                onClick={() => handleShowMore(post)}
              >
                Show more
              </button>
            </div>
          </div>
        </div>
      ))}
      {modalOpen && (
        <VerificationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          post={selectedPost}
          onSuccess={handleVerificationSuccess}
        />
      )}
    </div>
  );
};

export default Post;
