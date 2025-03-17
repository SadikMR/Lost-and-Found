import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Pages/Shared/Footer/Footer';
import Navbar from '../Component/Pages/Shared/Navbar/Navbar';

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#FAF7F0]">
            <Navbar></Navbar>
            <div className="flex-grow">
                <Outlet />
            </div>
            <div className='w-full'>
            <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;