import { useState } from "react";
import Swal from "sweetalert2";

const endpoints = import.meta.env.VITE_backendUrl;

const ReportModal = ({ reportedUserId, reporterUserId, onClose }) => {
  const [isReporting, setIsReporting] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleReport = async () => {
    setIsReporting(true);

    // Ask for the report reason
    const { value: reason } = await Swal.fire({
      title: "Report Profile",
      input: "select",
      inputOptions: {
        "Fake Profile": "Fake Profile",
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
      setIsReporting(false);
      return;
    }

    setSelectedReason(reason);

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
        setIsReporting(false);
        return;
      }

      setCustomReason(customDescription);
      submitReport(reason, customDescription);
    } else {
      submitReport(reason, "");
    }
  };

  const submitReport = async (reason, specifiedReason) => {
    try {
      const response = await fetch(`${endpoints}/report/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportedUserId,
          reporterUserId,
          reason,
          specifiedReason: specifiedReason || "", // Send the custom reason only if provided
        }),
      });

      const data = await response.json();
      if (data.success) {
        Swal.fire(
          "Reported!",
          "Profile reported successfully.",
          "success"
        ).then(onClose);
      } else {
        Swal.fire(
          "Error!",
          data.message || "Could not report profile.",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        "An error occurred while reporting the profile.",
        "error"
      );
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Report Profile</h2>
        <p>Are you sure you want to report this profile?</p>
        <div className="mt-4">
          {/* Show a textarea only when the reason is "Other" */}
          {selectedReason === "Other" && (
            <div className="mt-4">
              <textarea
                className="w-full h-32 border border-gray-300 p-2 rounded-md"
                placeholder="Please describe the issue"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleReport}
            className="px-4 py-2 bg-red-500 text-white rounded"
            disabled={isReporting}
          >
            {isReporting ? "Reporting..." : "Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
