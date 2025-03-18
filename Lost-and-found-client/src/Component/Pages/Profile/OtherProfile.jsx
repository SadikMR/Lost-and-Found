import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';


const endpoints = import.meta.env.VITE_backendUrl;

const OtherProfile = () => {
    const location = useLocation();
    const { id } = useParams(); // Get receiver ID from the URL
    const [receiverInfo, setReceiverInfo] = useState(null);

    useEffect(() => {
        if (location.state?.receiverInfo) {
            setReceiverInfo(location.state.receiverInfo);
        } else {
            // Fallback: Fetch data from API using receiver ID
            fetch(`${endpoints}/user/getOtherUserInfo/${id}`)
                .then((res) => res.json())
                .then((data) => setReceiverInfo(data))
                .catch((err) => console.error("Error fetching data:", err));
        }
    }, [location.state, id]);

    if (!receiverInfo) {
        return <p className="text-center text-xl">Loading user data...</p>; // Show a loading state
    }

    return (
        <div className="max-w-4xl mx-auto p-6 m-5 bg-[#E5E1DA] shadow-md rounded-lg text-black">
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        {/* User Profile Picture */}
                        <img
                            src={receiverInfo.data.image}
                            alt="User"
                            className="w-32 h-32 rounded-full border border-gray-300 cursor-pointer hover:opacity-80"
                        // onClick={() => handleImageClick(receiverInfo.data.image)}
                        />

                        <div className="flex flex-col justify-center">
                            {/* Full Name */}
                            <h2 className="text-xl sm:text-3xl font-semibold text-black">
                                {receiverInfo.data.fullname}
                            </h2>

                            {/* Username */}
                            <p className=" text-gray-600 mt-1 font-serif font-semibold text-xl">
                                <span className="text-gray-500">@ </span>
                                {receiverInfo.data.username || "Nickname"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <p>
                        <span className="font-semibold">Division:</span>{" "}
                        {receiverInfo.data.division || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Zilla:</span>{" "}
                        {receiverInfo.data.zilla || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Upzilla:</span>{" "}
                        {receiverInfo.data.upzilla || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Village:</span>{" "}
                        {receiverInfo.data.village || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Contact Number:</span>{" "}
                        {receiverInfo.data.phone || "N/A"}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {receiverInfo.data.email || "N/A"}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default OtherProfile;