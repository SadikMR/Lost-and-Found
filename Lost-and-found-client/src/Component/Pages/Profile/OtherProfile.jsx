import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const endpoints = import.meta.env.VITE_backendUrl;

const OtherProfile = () => {
    const [profileInfo, setProfileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const receiverDataId = useParams();
    console.log(receiverDataId.receiverDataId);
    const userDataId = receiverDataId.receiverDataId;

    // Fetch user profile information
    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const response = await fetch(`${endpoints}/user/getInfo/${userDataId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileInfo(data);
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
    }, []);
    console.log("profileInfo 123 ", profileInfo.data.fullname);

    return (
        <div className="max-w-4xl mx-auto p-6 m-5 bg-[#E5E1DA] shadow-md rounded-lg text-black">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        {/* User Profile Picture */}
                        <img
                            src={profileInfo.data.image}
                            alt="User"
                            className="w-32 h-32 rounded-full border border-gray-300 cursor-pointer hover:opacity-80"
                            // onClick={() => handleImageClick(profileInfo.data.image)}
                        />

                        <div className="flex flex-col justify-center">
                            {/* Full Name */}
                            <h2 className="text-xl sm:text-3xl font-semibold text-black">
                                {profileInfo.data.fullname}
                            </h2>

                            {/* Username */}
                            <p className=" text-gray-600 mt-1 font-serif font-semibold text-xl">
                                <span className="text-gray-500">@ </span>
                                {profileInfo.data.username || "Nickname"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <p>
                        <span className="font-semibold">Division:</span>{" "}
                        {profileInfo.data.division || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Zilla:</span>{" "}
                        {profileInfo.data.zilla || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Upzilla:</span>{" "}
                        {profileInfo.data.upzilla || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Village:</span>{" "}
                        {profileInfo.data.village || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Contact Number:</span>{" "}
                        {profileInfo.data.phone || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {profileInfo.data.email || "N/A"}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default OtherProfile;