import React from 'react';

const Profile = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 mb-5 bg-white shadow-md rounded-lg text-black">
            <div className="flex items-center gap-6">
                <img
                    src=''
                    alt="User"
                    className="w-24 h-24 rounded-full border border-gray-300"
                />
                <div>
                    <h2 className="text-2xl font-bold">Abul sarker</h2>
                    <p className="">Abul</p>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <p>
                    <span className="font-semibold">Division:</span> Rajshahi
                </p>
                <p>
                    <span className="font-semibold">Zilla:</span> Sirajgong
                </p>
                <p>
                    <span className="font-semibold">Upzilla:</span> Sadar
                </p>
                <p>
                    <span className="font-semibold">Village:</span> Dhukhia bari
                </p>
                <p>
                    <span className="font-semibold">Contact Number:</span> 01613******
                </p>
                <p>
                    <span className="font-semibold">Email:</span> ss0379182@gmail.com
                </p>
            </div>

            <div className="card-actions justify-end">
                <p className="btn btn-primary"><a href="/profile/editProfile">Edit Profile</a></p>
            </div>
        </div>
    );
};

export default Profile;