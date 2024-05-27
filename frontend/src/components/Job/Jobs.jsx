import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://placement-office.vercel.app/job/getall", {
          withCredentials: true,
        });
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="min-h-screen py-10 px-4">
      <div className="max-w-6xl text-center mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">ALL AVAILABLE JOBS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div
                className="card bg-white transition-transform hover:scale-105 hover:bg-blue-50 shadow-2xl duration-300 p-4 rounded-lg cursor-pointer"
                key={element._id}
              >
                <p className="text-xl font-semibold">{element.title}</p>
                <p>{element.category}</p>
                <p className="mb-4">{element.country}</p>
                <Link
                  to={`/job/${element._id}`}
                  className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  Job Details
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
