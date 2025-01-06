import React, { useContext, useEffect, useState } from 'react';
import profile_img from '../../../assets/logo.jpg';
import { AuthContext } from '../../../AuthProviders/AuthProvider';

const endpoints = import.meta.env.VITE_backendUrl;

const Profile = () => {
    const [profileInfo, setProfileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getCurrentUser } = useContext(AuthContext);
    const user = getCurrentUser();

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const response = await fetch(`${endpoints}/user/getInfo/${user.uid}`);
                const data = await response.json();
                setProfileInfo(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile info:', error);
                setLoading(false);
            }
        };

        fetchProfileInfo();
    }, []);

    // Ensure profileInfo is not null before accessing its properties
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!profileInfo) {
        return <p>Error loading profile information.</p>;
    }

    console.log(profileInfo.data);
    return (
        <div className="max-w-4xl mx-auto p-6 m-5 bg-[#E5E1DA] shadow-md rounded-lg text-black">
            <div>
                <div className="flex items-center gap-6">
                    <img
                        src={profile_img}
                        alt="User"
                        className="w-24 h-24 rounded-full border border-gray-300"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{profileInfo.data.fullname || 'Name'}:</h2>
                        <p>{profileInfo.data.username || 'Nickname'}</p>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <p>
                        <span className="font-semibold">Division:</span> {profileInfo.data.division || 'N/A'}
                    </p>
                    <p>
                        <span className="font-semibold">Zilla:</span> {profileInfo.data.zilla || 'N/A'}
                    </p>
                    <p>
                        <span className="font-semibold">Upzilla:</span> {profileInfo.data.upzilla || 'N/A'}
                    </p>
                    <p>
                        <span className="font-semibold">Village:</span> {profileInfo.data.village || 'N/A'}
                    </p>
                    <p>
                        <span className="font-semibold">Contact Number:</span> {profileInfo.data.contact || 'N/A'}
                    </p>
                    <p>
                        <span className="font-semibold">Email:</span> {profileInfo.data.email || 'N/A'}
                    </p>
                </div>

                <div className="card-actions justify-end">
                    <p className="btn btn-primary"><a href="/profile/editProfile">Edit Profile</a></p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
