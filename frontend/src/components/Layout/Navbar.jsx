import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/logout", {
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
      <Link to={"/"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">

        <div className="logo">
          <img src="/logo.png" alt="logo" className="h-8"/>
        </div>
        </Link>
        <ul className={`md:flex md:items-center ${show ? "block" : "hidden"} md:block`}>
          
          <li className="md:mr-6">
            <Link to={"/job/getall"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
              ALL JOBS
            </Link>
          </li>
          <li className="md:mr-6">
            <Link to={"/interview/getallques"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
              ALL QUESTIONS
            </Link>
          </li>
          {user && user.role === "Admin" && (
            <>
              <li className="md:mr-6">
                <Link to={"/interview/postques"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                  POST NEW QUES
                </Link>
              </li>
              </>
              )}
          <li className="md:mr-6">
            <Link to={"/applications/me"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
              {user && user.role === "Admin" ? "STUDENT'S APPLICATIONS" : "MY APPLICATIONS"}
            </Link>
            
          </li>
          
          {user && user.role === "Admin" && (
            <>
              <li className="md:mr-6">
                <Link to={"/job/post"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                  POST NEW JOB
                </Link>
              </li>
              <li className="md:mr-6">
                <Link to={"/job/me"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
            
          )}
          {user && user.role === "Student" && (
                      <>
                        <li className="md:mr-6">
                          <Link to={"/contact"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                            CONTACT
                          </Link>
                        </li>
                        </>
          )}
          {user && user.role === "Student" && (
                      <>
                        <li className="md:mr-6">
                          <Link to={"/placement"} onClick={() => setShow(false)} className="text-white hover:text-gray-200 transition duration-150">
                            PLACEMENT HIGHLIGHTS
                          </Link>
                        </li>
                        </>
          )}
          <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-150 md:ml-4 mt-4 md:mt-0">
            LOGOUT
          </button>
        </ul>
        <div className="hamburger md:hidden">
          <GiHamburgerMenu onClick={() => setShow(!show)} className="text-white text-2xl" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
