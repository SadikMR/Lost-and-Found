import React from 'react';

const EditProfile = () => {

    const handleProfileEdit = e => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullName.value;
        const userName = form.userName.value;
        const division = form.division.value;
        const zilla = form.zilla.value;
        const upzilla = form.upzilla.value;
        const village = form.village.value;
        const contactNumber = form.contactNumber.value;
        const email = form.email.value;
        const image = form.image.value;

        const profileInfo = {
            fullName,
            userName,
            division,
            zilla,
            upzilla,
            village,
            contactNumber,
            email,
            image
        };

        
        console.log(profileInfo);
    };
    return (
        <div className="max-w-2xl mx-auto text-black p-6 bg-[#E5E1DA] shadow-md rounded-lg mb-5">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
            <form onSubmit={handleProfileEdit} className="space-y-4">
                {/* Full Name */}
                <div className=''>
                    <label className="block text-sm font-semibold text-black">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter your full name"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* User Name */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        User Name
                    </label>
                    <input
                        type="text"
                        id='userName'
                        placeholder="Enter your username"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Division */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Division
                    </label>
                    <input
                        type="text"
                        id='division'
                        placeholder="Enter your division"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Zilla */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Zilla
                    </label>
                    <input
                        type="text"
                        id='zilla'
                        placeholder="Enter your zilla"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Upzilla */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Upzilla
                    </label>
                    <input
                        type="text"
                        id='upzilla'
                        placeholder="Enter your upzilla"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Village */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Village
                    </label>
                    <input
                        type="text"
                        id='village'
                        placeholder="Enter your village"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Contact Number */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        id='contactNumber'
                        placeholder="Enter your contact number"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Email
                    </label>
                    <input
                        type="email"
                        id='email'
                        placeholder="Enter your email"
                        className="text-black bg-white mt-1 block w-full border border-gray-300 rounded-md p-2 "
                    />
                </div>
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-semibold text-black">
                        Upload Profile Picture
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*" // Restrict to image files only
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