import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../AuthProviders/AuthProvider";
import Swal from "sweetalert2";
// import { navigate } from "react-router-dom";

const endpoints = import.meta.env.VITE_backendUrl;

const EditProfile = () => {
    const [editProfileInfo, setEditProfileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getCurrentUser } = useContext(AuthContext);
    const user = getCurrentUser();
    const userId = user.uid;


    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const response = await fetch(`${endpoints}/user/getInfo/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setEditProfileInfo(data.data || []);
                } else {
                    console.error('Failed to fetch profile info.');
                }
            } catch (error) {
                console.error('Error fetching profile info:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileInfo();
    }, []);


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setEditProfileInfo((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleEditProfileInfo = (e) => {
        e.preventDefault();
        fetch(`${endpoints}/user/updateInfo/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editProfileInfo),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("update post data 1 :", data);
                if (data.success) {
                    Swal.fire({
                        title: "Success!",
                        text: "User profile updated successfully",
                        icon: "success",
                    });
                    // navigate("/profile");
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred. Please try again.",
                        icon: "error",
                    });
                }
            })
            .catch((error) => {
                console.error("Error updating User profile:", error);
            });
    };


    console.log("Edit Profile Info :", editProfileInfo);



    return (
        <div className="max-w-2xl mx-auto text-black p-6 mt-7 bg-[#E5E1DA] shadow-md rounded-lg mb-5">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
            <form onSubmit={handleEditProfileInfo} className="space-y-4">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold text-black">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        value={editProfileInfo.fullname || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* User Name */}
                <div>
                    <label className="block text-sm font-semibold text-black">User Name</label>
                    <input
                        type="text"
                        id="username"
                        value={editProfileInfo.username || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Division */}
                <div>
                    <label className="block text-sm font-semibold text-black">Division</label>
                    <input
                        type="text"
                        id="division"
                        value={editProfileInfo.division || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your division"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Zilla */}
                <div>
                    <label className="block text-sm font-semibold text-black">Zilla</label>
                    <input
                        type="text"
                        id="zilla"
                        value={editProfileInfo.zilla || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your zilla"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Upzilla */}
                <div>
                    <label className="block text-sm font-semibold text-black">Upzilla</label>
                    <input
                        type="text"
                        id="upzilla"
                        value={editProfileInfo.upzilla || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your upzilla"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Village */}
                <div>
                    <label className="block text-sm font-semibold text-black">Village</label>
                    <input
                        type="text"
                        id="village"
                        value={editProfileInfo.village || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your village"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block text-sm font-semibold text-black">Contact Number</label>
                    <input
                        type="text"
                        id="phone"
                        value={editProfileInfo.phone || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your contact number"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-semibold text-black">Upload Profile Picture</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="mt-1 block w-full text-black bg-white border border-gray-300 rounded-md p-2"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full btn bg-buttonColor1 text-white hover:bg-buttonColor3 hover:scale-105 transition-all duration-300"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
