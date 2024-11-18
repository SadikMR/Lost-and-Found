import React from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="h-40 w-full bg-lime-700 mb-5 text-white">

            <div className=''>
                <div className='ml-32 mr-32 flex justify-between p-5'>
                    <h1 className='mr-5'><NavLink to='/'>Lost & Found</NavLink></h1>
                    <div className='flex space-x-2 items-center'>
                        <span className='text-5xl'><IoPersonCircleOutline /></span>
                        <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
                <form className="flex ml-40">
                    {/* Category Input */}
                    <input
                        type="text"
                        placeholder="Category"
                        className="p-2 border rounded-lg focus:outline-none w-full lg:w-1/4"
                    />

                    {/* Location Input */}
                    <input
                        type="text"
                        placeholder="Location"
                        className="p-2 border rounded-lg focus:outline-none w-full lg:w-1/4"
                    />

                    {/* Lost or Found Dropdown */}
                    <select
                        value={status}
                        className="p-2 border rounded-lg focus:outline-none w-full lg:w-1/4"
                    >
                        <option value="lost">Lost</option>
                        <option value="found">Found</option>
                    </select>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900 focus:outline-none w-full lg:w-auto"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Navbar;