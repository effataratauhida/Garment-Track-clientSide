import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiScissors } from "react-icons/hi";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-11/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo & Description */}
        <div>
          <Link to='/' className="flex items-center mb-4 hover:scale-105 ">
            <HiScissors className='h-7 w-7' />
            <h2 className='text-gray-300 font-bold text-2xl'>
             Garment<span className='text-[#F83600]'>Track</span>
            </h2>
             
          </Link>



          <p className="text-white font-medium">
            Track your orders & production workflow efficiently.
          </p>
        </div>

        {/* Useful Links */}
        <div className="text-white">
          <h3 className="font-semibold mb-2 ">Quick Links</h3>
          <ul className="font-medium">
            <li className="mb-1 hover:text-orange-600 cursor-pointer">Home</li>
            <li className="mb-1 hover:text-orange-600 cursor-pointer">All Products</li>
            <li className="mb-1 hover:text-orange-600 cursor-pointer">About US</li>
            <li className="mb-1 hover:text-orange-600 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <FaFacebook className="hover:text-blue-600 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-500 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="max-w-11/12 mx-auto mt-4"><hr /></div>
      <div className="max-w-11/12 mx-auto mt-6 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} Garments Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
