import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("https://placement-office.vercel.app/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={`bg-gray-800 p-5 ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150 flex items-center mr-3 ">
          <img src="/logo.png" alt="logo" className="h-12 mr-2" />
          <span className="font-semibold text-xl text-blue-50 font-serif">Placement Office</span>
        </Link>
        <div className="md:hidden">
          {show ? (
            <AiOutlineClose onClick={() => setShow(false)} className="text-white text-2xl" />
          ) : (
            <GiHamburgerMenu onClick={() => setShow(true)} className="text-white text-2xl" />
          )}
        </div>
        <div
          className={`absolute top-16 right-0 bg-gray-800 p-2 z-20 transform ${show ? "translate-x-0" : "translate-x-full" } transition-transform duration-300 ease-in-out md:relative md:top-0 md:translate-x-0 md:flex md:flex-row md:items-center md:space-x-6`}
        >
          <ul className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-6 w-full text-center">
            <li>
              <Link to="/job/getall" onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                All Jobs
              </Link>
            </li>
            <li>
              <Link to="/interview/getallques" onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                Interview Ques
              </Link>
            </li>
            {user && user.role === "Admin" && (
              <>
                <li>
                  <Link to="/interview/postques" onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                    Post Ques
                  </Link>
                </li>
                
                <li>
                  <Link to="/job/post" onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                    Post Job
                  </Link>
                </li>
                <li>
                  <Link to="/job/me" onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                    My Jobs
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to={"/applications/me"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                {user && user.role === "Admin" ? "Student's Applications" : "My Applications"}
              </Link>
            
            </li>
            {user && user.role === "Student" && (
              <>
                <li>
                  <Link to="/contact" onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/placement" onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                    Placement Highlights
                  </Link>
                </li>
              </>
            )}
            <li>
              <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150">
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
