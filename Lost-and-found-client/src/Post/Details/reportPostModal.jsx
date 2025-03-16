import { useState } from "react";
import Swal from "sweetalert2";

const endpoints = import.meta.env.VITE_backendUrl;
import Post from "../PostCard/PostCard";

const ReportModal = ({ postId, postType, reporterUserId, onClose }) => {
  const [isReporting, setIsReporting] = useState(false);
  const [selectedReason, setSelectedReason] = useState(""); // Keeps track of the selected reason
  const [customReason, setCustomReason] = useState(""); // Keeps track of custom reason if selected

  const handleReport = async () => {
    setIsReporting(true); // Start the reporting process

    try {
      // Ask for the report reason using SweetAlert modal
      const { value: reason } = await Swal.fire({
        title: "Report Post",
        input: "select",
        inputOptions: {
          "Fake Post": "Fake Post",
          "Inappropriate Content": "Inappropriate Content",
          "Harassment or Bullying": "Harassment or Bullying",
          "Spam or Scam": "Spam or Scam",
          Other: "Other",
        },
        inputPlaceholder: "Select a reason",
        showCancelButton: true,
        confirmButtonText: "Next",
      });

      if (!reason) {
        console.log("No reason selected, reporting aborted.");
        setIsReporting(false);
        return;
      }

      console.log("Reason selected:", reason);
      setSelectedReason(reason); // Update state with selected reason

      // If the reason is 'Other', show an input field to capture the custom description
      if (reason) {
        const { value: customDescription } = await Swal.fire({
          title: "Specify the Issue",
          input: "textarea",
          inputPlaceholder: "Please describe the issue",
          showCancelButton: true,
          confirmButtonText: "Submit Report",
        });

        if (!customDescription) {
          Swal.fire(
            "Error!",
            "Please provide a description for the issue.",
            "error"
          );
          setIsReporting(false);
          return;
        }

        console.log("Custom description:", customDescription);
        setCustomReason(customDescription); // Save custom description
        submitReport(reason, customDescription); // Submit with custom description
      } else {
        submitReport(reason, ""); // Submit with just the selected reason
      }
    } catch (error) {
      console.error("Error during report handling:", error);
      Swal.fire(
        "Error!",
        "An unexpected error occurred. Please try again.",
        "error"
      );
      setIsReporting(false);
    }
  };

  const submitReport = async (reason, specifiedReason) => {
    console.log("Submitting report with reason:", reason);

    try {
      const response = await fetch(`${endpoints}/report/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          postType,
          reporterUserId,
          reason,
          specifiedReason: specifiedReason || "", // Send the custom reason only if provided
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Report submitted successfully");
        Swal.fire("Reported!", "Post reported successfully.", "success").then(
          onClose
        );
      } else {
        Swal.fire("Error!", data.message || "Could not report post.", "error");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      Swal.fire(
        "Error!",
        "An error occurred while reporting the post.",
        "error"
      );
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Report Post</h2>
        <p>Are you sure you want to report this Post?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleReport}
            className="px-4 py-2 bg-red-500 text-white rounded"
            disabled={isReporting} // Button is only disabled during reporting process
          >
            {isReporting ? "Reporting..." : "Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
