import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProviders/AuthProvider";
import Swal from "sweetalert2";
// import Compressor from "compressorjs"; // Import image compressor

const endpoints = import.meta.env.VITE_backendUrl;

const EditProfile = () => {
  const [editProfileInfo, setEditProfileInfo] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});
  const [loading, setLoading] = useState(true);
  const { getCurrentUser } = useContext(AuthContext);
  const user = getCurrentUser();
  const userId = user.uid;

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(`${endpoints}/user/getInfo/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setEditProfileInfo(data.data || {});
        } else {
          console.error("Failed to fetch profile info.");
        }
      } catch (error) {
        console.error("Error fetching profile info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileInfo();
  }, [userId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedFields((prev) => ({ ...prev, [id]: value }));
    setEditProfileInfo((prevState) => ({ ...prevState, [id]: value }));
  };

  // Handle image upload and convert to Base64 with compression
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check if the file size is greater than 10MB
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          title: "Error!",
          text: "Image size is too large. Please upload an image smaller than 5MB.",
          icon: "error",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Get the Base64 encoded image
        setUpdatedFields((prev) => ({ ...prev, image: base64Image }));
      };
      reader.readAsDataURL(file); // Convert the image to base64 without compression
    }
  };

  const handleEditProfileInfo = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (Object.keys(updatedFields).length === 0) {
      Swal.fire({ title: "Info!", text: "No changes detected.", icon: "info" });
      setIsSubmitting(false);
      return;
    }

    // Log the updatedFields object to verify if the image is added correctly
    console.log("Updated Fields: ", updatedFields);

    // Construct the request body as a JSON object
    const requestBody = { ...updatedFields };

    // Log the JSON request body to the console for debugging
    console.log("Request Body:", requestBody);
    console.log("User ID:", userId);

    try {
      const response = await fetch(`${endpoints}/user/updateInfo/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Ensure the server knows it's a JSON payload
        },
        body: JSON.stringify(requestBody), // Convert the JSON object to a string
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully",
          icon: "success",
        });
        setUpdatedFields({});
      } else {
        Swal.fire({
          title: "Error!",
          text: "Update failed. Try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsSubmitting(false);
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto text-black p-6 mt-7 bg-[#E5E1DA] shadow-md rounded-lg mb-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleEditProfileInfo} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-black">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            value={editProfileInfo?.fullname || ""}
            onChange={handleInputChange}
            className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Division */}
        <div>
          <label className="block text-sm font-semibold text-black">
            Division
          </label>
          <input
            type="text"
            id="division"
            value={editProfileInfo?.division || ""}
            onChange={handleInputChange}
            className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Zilla */}
        <div>
          <label className="block text-sm font-semibold text-black">
            Zilla
          </label>
          <input
            type="text"
            id="zilla"
            value={editProfileInfo?.zilla || ""}
            onChange={handleInputChange}
            className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Upzilla */}
        <div>
          <label className="block text-sm font-semibold text-black">
            Upzilla
          </label>
          <input
            type="text"
            id="upzilla"
            value={editProfileInfo?.upzilla || ""}
            onChange={handleInputChange}
            className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Village */}
        <div>
          <label className="block text-sm font-semibold text-black">
            Village
          </label>
          <input
            type="text"
            id="village"
            value={editProfileInfo?.village || ""}
            onChange={handleInputChange}
            className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-semibold text-black">
            Contact Number
          </label>
          <input
            type="text"
            id="phone"
            value={editProfileInfo?.phone || ""}
            onChange={handleInputChange}
            className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-black">
            Change Profile Picture
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-black bg-white border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Display selected image */}
        {updatedFields.image && (
          <div className="mt-4">
            <label className="block text-sm font-semibold text-black">
              Selected Image Preview
            </label>
            <img
              src={updatedFields.image}
              alt="Preview"
              className="mt-2 max-w-[200px] h-auto rounded-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
            type="submit"
            className="px-4 py-2 text-white bg-[#0A97B0] rounded-lg hover:bg-[#087F90] focus:outline-none w-full  disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Profile..." : "Update Profile"}
          </button>
      </form>
    </div>
  );
};

export default EditProfile;
