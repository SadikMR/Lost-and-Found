import React from 'react';
import Post from '../../../Post/PostCard/PostCard';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div className='ml-20 '>
            <div className='flex justify-between'> 
                <h1 className='text-2xl font-semibold'>ALL the post here</h1>
                <div className='flex space-x-3 mr-10'>
                    <p className='border p-1 bg-sky-600 text-white mb-2 rounded-md font-semibold'><NavLink to='/lost'>Post for Lost</NavLink></p>
                    <p className='border p-1 bg-sky-600 text-white mb-2 rounded-md font-semibold'><NavLink to='found'>Post for Found</NavLink></p>
                </div>
            </div>
            <Post></Post>
        </div>
    );
};

export default Home;