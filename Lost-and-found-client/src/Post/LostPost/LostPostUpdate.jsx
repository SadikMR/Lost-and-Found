import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProviders/AuthProvider";
import { useParams } from "react-router-dom";
// import axios from "axios";

const endpoints = import.meta.env.VITE_backendUrl;

const LostPostUpdate = () => {
    const { getCurrentUser } = useContext(AuthContext);
    const user = getCurrentUser();
    const [currentlostpostInfo, setCurrentlostpostInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const { _id } = useParams();
    const postId = _id;
    const [isSubmitting, setIsSubmitting] = useState(false);



    // Fetch the Specific User found post information
    useEffect(() => {
        const fetchCurrentLostPost = async () => {
            try {
                const response = await fetch(`${endpoints}/posts/lost/getSpecificLostPosts/${postId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCurrentlostpostInfo(data.data || []);
                } else {
                    console.error("Failed to fetch post info.");
                }
            } catch (error) {
                console.error("Error fetching post info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentLostPost();
    }, [user.uid]);


    // console.log("currentLostpostInfo", currentLostpostInfo.color);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCurrentlostpostInfo((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleLostPostUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        fetch(`${endpoints}/posts/lost/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentlostpostInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("update post data 1 :", data);
                if (data.success) {
                    Swal.fire({
                        title: "Success!",
                        text: "Lost Post updated successfully",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred. Please try again.",
                        icon: "error",
                    });
                }
            })
            .catch((error) => {
                console.error("Error updating lost post:", error);
            });
        setIsSubmitting(false);
    };


    if (loading) {
        return <div className="text-center text-xl">Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen mb-5">
            <div className="max-w-3xl bg-[#EADBC8] rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Update Lost Post Form
                </h2>
                <p className="text-center text-gray-600 mt-2">
                    Fill out the form to update your post
                </p>
                <form
                    onSubmit={handleLostPostUpdate}
                    className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                >

                    {/* Product Name */}
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-black">
                            Product Name *
                        </label>
                        <input
                            type="text"
                            id="productName"
                            value={currentlostpostInfo.productName || ""}
                            onChange={handleInputChange}
                            required
                            className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Color */}
                    <div>
                        <label htmlFor="color" className="block text-sm font-medium text-black">
                            Color
                        </label>
                        <select
                            id="color"
                            value={currentlostpostInfo.color || ""}
                            onChange={handleInputChange}
                            className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Color</option>
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="White">White</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Purple">Purple</option>
                        </select>
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-black">
                            Short Description
                        </label>
                        <textarea
                            id="description"
                            value={currentlostpostInfo.description || ""}
                            onChange={handleInputChange}
                            className="bg-white text-black mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            rows="3"
                        ></textarea>
                    </div>


                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-[#0A97B0] rounded-lg hover:bg-[#087F90] focus:outline-none w-full  disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Updating..." : "Update Lost Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LostPostUpdate;
