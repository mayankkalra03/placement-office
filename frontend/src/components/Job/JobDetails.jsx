import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/job/${id}`, {
          withCredentials: true,
        });
        setJob(response.data.job);
      } catch (error) {
        navigateTo("/notfound");
      }
    };

    fetchJob();
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h3 className="font-bold text-xl mb-2 text-center">Job Details</h3>
          <div className="space-y-3">
            <p>
              Title: <span className="font-semibold"> {job.title}</span>
            </p>
            <p>
              Category: <span className="font-semibold">{job.category}</span>
            </p>
            <p>
              Country: <span className="font-semibold">{job.country}</span>
            </p>
            <p>
              City: <span className="font-semibold">{job.city}</span>
            </p>
            <p>
              Location: <span className="font-semibold">{job.location}</span>
            </p>
            <p>
              Description: <span className="font-semibold">{job.description}</span>
            </p>
            <p>
              Job Posted On: <span className="font-semibold">{job.jobPostedOn}</span>
            </p>
            <p>
              Salary:{" "}
              <span className="font-semibold">
                {job.fixedSalary ? (
                  `${job.fixedSalary}`
                ) : (
                  `${job.salaryFrom} - ${job.salaryTo}`
                )}
              </span>
            </p>
            {user && user.role === "Admin" ? null : (
              <Link
                to={`/application/${job._id}`}
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 ease-in-out"
              >
                Apply Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
