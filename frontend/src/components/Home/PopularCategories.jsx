import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      icon: <MdOutlineDesignServices className="text-4xl text-blue-500 mx-auto" />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      icon: <TbAppsFilled className="text-4xl text-green-500 mx-auto" />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      icon: <MdOutlineWebhook className="text-4xl text-red-500 mx-auto" />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      icon: <FaReact className="text-4xl text-cyan-500 mx-auto" />,
    },
    {
      id: 5,
      title: "Account & Finance",
      icon: <MdAccountBalance className="text-4xl text-yellow-500 mx-auto" />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      icon: <GiArtificialIntelligence className="text-4xl text-purple-500 mx-auto" />,
    },
    {
      id: 7,
      title: "Video Animation",
      icon: <MdOutlineAnimation className="text-4xl text-pink-500 mx-auto" />,
    },
    {
      id: 8,
      title: "Game Development",
      icon: <IoGameController className="text-4xl text-orange-500 mx-auto" />,
    },
  ];
  

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold text-center mb-8">POPULAR CATEGORIES</h3>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((element) => (
          <div
            key={element.id}
            className="card bg-white p-6 shadow-md rounded-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg text-center"
          >
            <div className="icon mb-4">{element.icon}</div>
            <div className="text">
              <p className="text-lg font-medium mb-2">{element.title}</p>
              <p className="text-gray-600">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
