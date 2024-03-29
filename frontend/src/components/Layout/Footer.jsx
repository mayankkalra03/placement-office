import React, { useContext } from "react";
import { Context } from "../../main";
import {  FaTwitter, FaLinkedinIn, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={`bg-gray-800 text-white p-4 mt-4 ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container p-4 mx-auto flex flex-col md:flex-row items-center justify-between">
        <div>
          <p className="text-2xl font-bold">Placement Office</p>
          <p className="mt-2">Your go-to platform for all placement related activities.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-lg font-semibold">Follow Us</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="text-white-500 hover:text-gray-700" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com" className="text-white-400 hover:text-gray-600" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com" className="text-white-800 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-lg font-semibold">Contact Us</p>
          <p>Email: info@placementtrackerapp.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Placement Office App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
