import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProviders/AuthProvider";
import Swal from "sweetalert2";
const endpoints = import.meta.env.VITE_backendUrl;

const VerificationModal = ({ isOpen, onClose, post, onSuccess }) => {
  const { getCurrentUser } = useContext(AuthContext);
  const user = getCurrentUser();
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const MAX_ATTEMPTS = 2;

  // Fetch attempts function
  const fetchAttempts = async () => {
    try {
      console.log("Fetching attempts for:", {
        userId: user.uid,
        postId: post._id,
      });

      const response = await axios.get(
        `${endpoints}/verify/getAttempts/${user.uid}/${post._id}`
      );

      console.log("API Response:", response.data);

      const attemptsData = response.data.attempts;
      setAttempts(attemptsData);

      if (attemptsData >= MAX_ATTEMPTS) {
        setLimitReached(true);
      } else {
        setLimitReached(false);
      }
    } catch (error) {
      console.error("Error fetching attempts:", error);
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  // Fetch attempts when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchAttempts();
    }
  }, [isOpen, post._id, user.uid]);

  // Handle verification logic
  const handleVerification = async () => {
    if (limitReached) {
      setVerificationResult("You have reached the maximum number of attempts.");
      return;
    }

    setLoading(true);
    setVerificationResult(null);

    try {
      // Send verification request
      const response = await axios.post(`${endpoints}/verify/ownership`, {
        color: post.color,
        description: `${post.description} ${post.brand}`,
        answer1,
        answer2,
        userId: user.uid,
        postId: post._id,
      });

      // Handle successful verification
      if (response.data.success) {
        Swal.fire({
          title: "Congratulations!",
          text: "You have passed the verification step",
          icon: "success",
          confirmButtonText: "OK",
        });
        setVerificationResult("Verification successful!");
        setTimeout(() => {
          onSuccess(); // Call the success handler to navigate or update state
        }, 1500);
      } else {
        Swal.fire({
          title: "Not Matching!",
          text: "Your given info doesn't match with the actual info",
          icon: "error",
          confirmButtonText: "OK",
        });
        setVerificationResult("Verification failed. Try again.");

        // Fetch updated attempt count after failed attempt
        await fetchAttempts();
      }
    } catch (error) {
      setVerificationResult("Error verifying. Please try again.");
    }

    setLoading(false);
  };

  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] max-w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Verify Ownership
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Answer these questions to verify ownership.
        </p>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What is the color of the item? <sup className="text-red-500">*</sup>
          </label>
          <input
            type="text"
            placeholder="Enter color name here"
            className="w-full px-4 py-3 bg-white border-2 border-black text-gray-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description (e.g. size, brand, serial no, etc.)
          </label>
          <textarea
            className="w-full px-4 py-3 bg-white border-2 border-black text-gray-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 sm:h-36 md:h-40 lg:h-48"
            placeholder="Enter your description here"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
          ></textarea>
        </div>

        {/* Display verification result */}
        {verificationResult && (
          <div
            className={`mt-3 text-sm ${
              verificationResult.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {verificationResult}
          </div>
        )}

        {/* Attempts Counter */}
        <div className="mt-4 text-center text-gray-700 font-medium">
          Attempts: {attempts}/{MAX_ATTEMPTS}
        </div>

        {/* Disable submission if the limit is reached */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="px-6 py-3 bg-gray-300 rounded-lg text-black font-medium hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
            onClick={handleVerification}
            disabled={loading || limitReached}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
