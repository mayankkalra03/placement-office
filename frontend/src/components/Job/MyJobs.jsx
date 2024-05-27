import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import '../../App.css'

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Admin")) {
      navigateTo("/");
      return;
    }

    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("https://placementoffice.onrender.com/job/getmyjobs", { withCredentials: true });
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, [isAuthorized, navigateTo, user]);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(`https://placementoffice.onrender.com/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const res = await axios.delete(`https://placementoffice.onrender.com/job/delete/${jobId}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="my-4">
      <div className="container mx-auto ">
      <h1 className="text-3xl text-center font-bold mb-6">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="space-y-4">
            {myJobs.map((element) => (
              <div className="card bg-white bg-opacity-60 border border-blue-50 shadow-lg rounded-lg overflow-hidden m-4 p-6" key={element._id}>
                <h1 className="text-center text-2xl text-blue-900 font-bold mb-4">{element.title}</h1>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputField
                      label="Title"
                      value={element.title}
                      onChange={(e) => handleInputChange(element._id, "title", e.target.value)}
                      disabled={editingMode !== element._id}
                    />
                    <InputField
                      label="Country"
                      value={element.country}
                      onChange={(e) => handleInputChange(element._id, "country", e.target.value)}
                      disabled={editingMode !== element._id}
                    />
                    <InputField
                      label="City"
                      value={element.city}
                      onChange={(e) => handleInputChange(element._id, "city", e.target.value)}
                      disabled={editingMode !== element._id}
                    />
                    <SelectField
                      label="Category"
                      value={element.category}
                      onChange={(e) => handleInputChange(element._id, "category", e.target.value)}
                      disabled={editingMode !== element._id}
                      options={[
                        { value: "Graphics & Design", label: "Graphics & Design" },
                        { value: "Mobile App Development", label: "Mobile App Development" },
                        { value: "Frontend Web Development", label: "Frontend Web Development" },
                        { value: "MERN Stack Development", label: "MERN STACK Development" },
                        { value: "Account & Finance", label: "Account & Finance" },
                        { value: "Artificial Intelligence", label: "Artificial Intelligence" },
                        { value: "Video Animation", label: "Video Animation" },
                        { value: "MEAN Stack Development", label: "MEAN STACK Development" },
                        { value: "MEVN Stack Development", label: "MEVN STACK Development" },
                        { value: "Data Entry Operator", label: "Data Entry Operator" },
                      ]}
                      
                    />

                    {element.fixedSalary ? (
                      <InputField
                        label="Salary"
                        type="number"
                        value={element.fixedSalary}
                        onChange={(e) => handleInputChange(element._id, "fixedSalary", e.target.value)}
                        disabled={editingMode !== element._id}
                      />
                    ) : (
                      <div className="">
                        <InputField
                          label="Salary From"
                          type="number"
                          value={element.salaryFrom}
                          onChange={(e) => handleInputChange(element._id, "salaryFrom", e.target.value)}
                          disabled={editingMode !== element._id}
                        />
                        <InputField
                          label="Salary To"
                          type="number"
                          value={element.salaryTo}
                          onChange={(e) => handleInputChange(element._id, "salaryTo", e.target.value)}
                          disabled={editingMode !== element._id}
                        />
                      </div>
                    )}
                    <SelectField
                      label="Expired"
                      value={String(element.expired)}
                      onChange={(e) => handleInputChange(element._id, "expired", e.target.value === 'true')}
                      disabled={editingMode !== element._id}
                      options={[
                        { value: "true", label: "TRUE" },
                        { value: "false", label: "FALSE" }
                      ]}
                    />

                    
                    <InputField
                      elementType="textarea"
                      label="Description"
                      value={element.description}
                      onChange={(e) => handleInputChange(element._id, "description", e.target.value)}
                      disabled={editingMode !== element._id}
                    />

                    <InputField
                      elementType="textarea"
                      label="Location"
                      value={element.location}
                      onChange={(e) => handleInputChange(element._id, "location", e.target.value)}
                      disabled={editingMode !== element._id}
                    />
                    

                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="flex items-center justify-center p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 transition duration-300"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleDisableEdit}
                          className="flex items-center justify-center p-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition duration-300"
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="flex items-center justify-center p-2 rounded-md bg-red-400 text-white hover:bg-red-600 transition duration-300"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      className="flex items-center justify-center p-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You haven't posted any jobs yet.</p>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, disabled, elementType = "input", rows = 4 }) => (
  <div className="flex flex-col mb-4">
    <label className="mb-2 text-md font-regular text-blue-600">{label}:</label>
    {elementType === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 resize-y ${disabled ? 'bg-gray-50' : 'bg-white'}`}
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300 ${disabled ? 'bg-gray-50' : 'bg-white'}`}
      />
    )}
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  disabled = false,
  options = [],
}) => (
  <div className="flex flex-col mb-4">
    <label className="mb-2 text-md font-regular text-blue-600">{label}</label>
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="bg-gray-50 border border-blue-300 text-gray-700 text-sm rounded-lg focus:ring-2 focus:ring-blue-200 block w-full p-2.5 transition duration-300"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default MyJobs;
