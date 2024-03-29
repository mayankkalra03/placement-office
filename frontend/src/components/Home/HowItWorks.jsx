import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <div className=" py-12">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-8">HOW PLACEMENT OFFICE WORKS</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-80 bg-white p-6 text-center shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            <FaUserPlus className="mx-auto text-4xl text-blue-500" />
            <p className="mt-4 font-semibold text-lg">Create Account</p>
            <p className="mt-2 text-gray-600">
              Embark on your journey with just a few clicks. Unlock a world of opportunities.
            </p>
          </div>
          <div className="w-80 bg-white p-6 text-center shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            <MdFindInPage className="mx-auto text-4xl text-green-500" />
            <p className="mt-4 font-semibold text-lg">Find a Job/Post a Job</p>
            <p className="mt-2 text-gray-600">
              Discover the perfect job or the ideal candidate. A seamless search awaits.
            </p>
          </div>
          <div className="w-80 bg-white p-6 text-center shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            <IoMdSend className="mx-auto text-4xl text-orange-500" />
            <p className="mt-4 font-semibold text-lg">Apply For Job/Recruit Suitable Candidates</p>
            <p className="mt-2 text-gray-600">
              Bridge your ambitions with opportunities. Apply or recruit with ease and precision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
