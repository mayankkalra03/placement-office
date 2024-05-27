import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Admin") {
        axios
          .get("https://placement-office.vercel.app/application/admin/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("https://placement-office.vercel.app/application/student/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`https://placement-office.vercel.app/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="min-h-screen py-10 px-5 md:px-10">
      {user && user.role === "Student" ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8">MY APPLICATIONS</h1>
          {applications.length <= 0 ? (
            <div className="mt-5">
              <h4 className="text-lg text-red-500">No Applications Found</h4>
            </div>
          ) : (
            applications.map((element) => (
              <StudentCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Applications From Students</h1>
          {applications.length <= 0 ? (
            <div className="mt-5">
              <h4 className="text-lg text-red-500">No Applications Found</h4>
            </div>
          ) : (
            applications.map((element) => (
              <AdminCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} applicantName={user.name}/>
      )}
    </section>
  );
    }
export default MyApplications;

const StudentCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4 flex flex-row">
      <div className="flex-grow p-4 flex flex-col justify-between">
        <div>
          <p className="font-bold text-xl mb-2">Name: {element.name}</p>
          <p>Email: {element.email}</p>
          <p>Phone: {element.phone}</p>
          <p>Address: {element.address}</p>
          <p>CoverLetter: {element.coverLetter}</p>
        </div>
        <button
          onClick={() => deleteApplication(element._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 self-start"
        >
          Delete Application
        </button>
      </div>
      <div className="flex justify-end items-center self-stretch p-4"> 
        <div className="w-48 h-full flex justify-center items-center overflow-hidden"> 
          <img
            src={element.resume.url}
            alt="resume"
            className="h-full w-auto cursor-pointer" 
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </div>
  );
};

const AdminCard = ({ element, openModal }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-4 flex flex-row">
      <div className="flex-grow p-4 flex flex-col justify-between">
        <div>
          <p className="font-bold text-xl mb-2">Name: {element.name}</p>
          <p>Email: {element.email}</p>
          <p>Phone: {element.phone}</p>
          <p>Address: {element.address}</p>
          <p>CoverLetter: {element.coverLetter}</p>
        </div>
      </div>
      <div className="flex justify-end items-center self-stretch p-4">
        <div className="w-48 h-full flex justify-center items-center overflow-hidden">
          <img
            src={element.resume.url}
            alt="resume"
            className="h-full w-auto cursor-pointer" 
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </div>
  );
};