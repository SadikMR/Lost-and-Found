import React from 'react';
import img from '../../../../assets/logo.jpg';

const Footer = () => {
    return (
        <div className="mx-auto bg-[#445069] text-white opacity-80">
            {/* Main Footer Section */}
            <footer className="p-4 flex flex-wrap justify-between items-center text-center sm:text-left gap-6 sm:gap-10">
                {/* Logo & Description */}
                <aside className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                    <img className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg" src={img} alt="Lost & Found Logo" />
                    <p className="text-sm sm:text-base mt-2">
                        Lost and Found Platform
                        <br />
                        Providing reliable tech since 2025
                    </p>
                </aside>

                {/* Services */}
                <nav className="w-full sm:w-auto">
                    <h6 className="footer-title text-lg font-semibold">Services</h6>
                    <ul className="text-sm space-y-1">
                        <li><a className="link link-hover">Branding</a></li>
                        <li><a className="link link-hover">Design</a></li>
                        <li><a className="link link-hover">Marketing</a></li>
                        <li><a className="link link-hover">Advertisement</a></li>
                    </ul>
                </nav>

                {/* Company */}
                <nav className="w-full sm:w-auto">
                    <h6 className="footer-title text-lg font-semibold">Company</h6>
                    <ul className="text-sm space-y-1">
                        <li><a className="link link-hover">About us</a></li>
                        <li><a className="link link-hover">Contact</a></li>
                        <li><a className="link link-hover">Jobs</a></li>
                        <li><a className="link link-hover">Press kit</a></li>
                    </ul>
                </nav>

                {/* Contributors */}
                <nav className="w-full sm:w-auto">
                    <h6 className="footer-title text-lg font-semibold">Contributors</h6>
                    <div className="text-sm space-y-1">
                        <div>
                            <h3 className="font-semibold">Md. Shahin Hossain</h3>
                            <p>200131.cse@student.just.edu.bd</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Md. Sadik Mahmud Raihan</h3>
                            <p>200132.cse@student.just.edu.bd</p>
                        </div>
                    </div>
                </nav>
            </footer>

            {/* Copyright Footer Section */}
            <footer className="footer footer-center p-2 text-sm">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by ZerOne Industries Ltd</p>
            </footer>
        </div>


    );
};

export default Footer;