import { useState } from "react";
import axios from "axios";
const endpoints = import.meta.env.VITE_backendUrl;

const VerificationModal = ({ isOpen, onClose, post, onSuccess }) => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    setLoading(true);
    setVerificationResult(null);

    try {
      const response = await axios.post(`${endpoints}/verify/ownership`, {
        color: post.color,
        description: `${post.description} ${post.brand}`,
        answer1,
        answer2,
      });

      if (response.data.success) {
        setVerificationResult("Verification successful!");
        setTimeout(() => {
          onSuccess(); // Navigate to details page
        }, 1500);
      } else {
        setVerificationResult("Verification failed. Try again.");
      }
    } catch (error) {
      setVerificationResult("Error verifying. Please try again.");
    }

    setLoading(false);
  };

  if (!isOpen) return null;

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
            className="w-full px-4 py-3 bg-white border-2 border-black text-gray-600  rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description (e.g. size, brand, serial no, e.t.c)
          </label>
          <textarea
            className="w-full px-4 py-3 bg-white border-2 border-black text-gray-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 sm:h-36 md:h-40 lg:h-48"
            placeholder="Enter your description here"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
          ></textarea>
        </div>

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
            disabled={loading}
          >
            {loading ? "Verifying..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
