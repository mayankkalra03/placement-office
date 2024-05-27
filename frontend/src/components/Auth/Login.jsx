import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://placementoffice.onrender.com/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen gap-10">
      <div className="flex-1 max-w-md px-4 py-8 bg-white shadow-lg rounded-lg mx-4 md:mx-8 lg:mx-16 mt-8">
        <h2 className="mb-8 text-center text-4xl font-bold text-gray-900">Login to your account</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative">
              <select
                id="role"
                name="role"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Student">Student</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <FaRegUser className="h-5 w-5"/>
              </div>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                id="email-address"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400" >
                <MdOutlineMailOutline className="h-6 w-6"/>
              </div>
            </div>

            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400" > 
                <RiLock2Fill className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>

      <div className="flex-1 flex justify-center items-center w-full max-w-lg px-4 md:px-0 ">
        <img
          src="/login.png"
          alt="Login"
          className="animate-hover"
        />
      </div>
    </div>
  );
};

export default Login;
