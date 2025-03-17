import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lostItemImage from "../../assets/item.jpg";
import VerificationModal from "../verificationModal"; // Import the modal
import { AuthContext } from "../../AuthProviders/AuthProvider";
const endpoints = import.meta.env.VITE_backendUrl;

const Post = ({ posts }) => {
  const navigate = useNavigate();
  const { getCurrentUser } = useContext(AuthContext);
  const user = getCurrentUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchAttempts = async (post) => {
    try {
      const response = await fetch(
        `${endpoints}/verify/getAttempts/${user.uid}/${post._id}`
      );
      const data = await response.json();
      console.log(data);

      if (data.success) {
        const { successfulAttempt } = data;
        return { successfulAttempt };
      } else {
        console.error("Failed to fetch attempts:", data.message);
        return { successfulAttempt: false, attemptsCount: 0 };
      }
    } catch (error) {
      console.error("Error while fetching attempts:", error);
      return { successfulAttempt, attemptsCount: 0 };
    }
  };

  const handleShowMore = async (post) => {
    const { successfulAttempt } = await fetchAttempts(post);
    console.log("successful :", successfulAttempt);

    if (successfulAttempt) {
      navigate("/details", { state: { post } });
    } else if (post.type === "found") {
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
                <strong>Location:</strong> {post.division}, {post.zilla}
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
