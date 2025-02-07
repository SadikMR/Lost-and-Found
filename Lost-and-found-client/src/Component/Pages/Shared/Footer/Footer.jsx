import React from 'react';
import img from '../../../../assets/logo.jpg';

const Footer = () => {
    return (
        <div className=' mx-auto bg-[#445069] text-white opacity-80'>
            <footer className="footer p-5">
                <aside>
                    <img className='h-24 w-24 rounded-lg' src={img} alt="" />
                    <p>
                        Lost and Found Platform
                        <br />
                        Providing reliable tech since 2025
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>

            </footer>
            <footer className="footer footer-center p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by ZerOne Industries Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;