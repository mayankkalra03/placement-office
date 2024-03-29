import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import toast from "react-hot-toast";

const InterviewPrep = () => {
  const [ques, setQues] = useState([]);
  const [filteredQues, setFilteredQues] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null); 
  const [editingMode, setEditingMode] = useState(null);
  const [editData, setEditData] = useState({ subject: '', question: '', answer: '' }); 
  const { isAuthorized, user } = useContext(Context); 
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchQues = async () => {
      try {
        const res = await axios.get("http://localhost:3001/interview/getallques", {
          withCredentials: true,
        });
        setQues(res.data.ques); 
        setFilteredQues(res.data.ques);
        const extractedSubjects = ['All', ...new Set(res.data.ques.map(q => q.subject))];
        setSubjects(extractedSubjects);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQues();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const handleSubjectChange = (e) => {
    const selected = e.target.value;
    setSelectedSubject(selected);
    setActiveIndex(null);
    if (selected === 'All') {
      setFilteredQues(ques);
    } else {
      const filtered = ques.filter(q => q.subject === selected);
      setFilteredQues(filtered);
    }
  };

  const toggleAccordion = (index) => {
    if (user.role === 'Student') {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  const updateQuestion = async (quesId) => {
    if (editingMode !== quesId) return;
  
    try {
      const res = await axios.put(`http://localhost:3001/interview/updateques/${quesId}`, {
        subject: editData.subject,
        question: editData.question,
        answer: editData.answer,
      }, {
        withCredentials: true,
      });
      toast.success("Question updated successfully!");
      
      const updatedQues = ques.map(q => q._id === quesId ? { ...q, subject: editData.subject, question: editData.question, answer: editData.answer } : q);
      setQues(updatedQues);
      const updatedSubjects = ['All', ...new Set(updatedQues.map(q => q.subject))];
      setSubjects(updatedSubjects);
      const filtered = updatedQues.filter(q => selectedSubject === 'All' || q.subject === selectedSubject || editData.subject === selectedSubject);
      setFilteredQues(filtered);

      setEditingMode(null);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "An error occurred");
    }
  };


  const handleDeleteQues = async (quesId) => {
    try {
      const res = await axios.delete(`http://localhost:3001/interview/deleteques/${quesId}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setQues((prevQues) => {
        const updatedQues = prevQues.filter((ques) => ques._id !== quesId);
        
        const remainingSubjects = ['All', ...new Set(updatedQues.map((q) => q.subject))];
        setSubjects(remainingSubjects);
        
        if (!remainingSubjects.includes(selectedSubject)) {
          setSelectedSubject('All');
          setFilteredQues(updatedQues); 
        } else {
          const filtered = selectedSubject === 'All' ? updatedQues : updatedQues.filter(q => q.subject === selectedSubject);
          setFilteredQues(filtered);
        }
  
        return updatedQues;
      });
    } catch (error) {
      toast.error(error.response ? error.response.data.message : "An error occurred");
    }
  };
  

  return (
    <section className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-6">Prepare for Interviews</h1>

        <div className="mb-4 text-center">
        <label htmlFor="subject-filter" className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-700 p-4 ">Filter by subject:</label>
        <select
          id="subject-filter"
          value={selectedSubject}
          onChange={handleSubjectChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        >
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
        </div>

        <div className="flex flex-col space-y-4">
          {filteredQues.map((element, index) => (
            <div
              className={`accordion-item bg-white shadow-md ${user.role === 'Admin' ? '' : 'hover:shadow-lg'} transition-shadow duration-300 p-4 rounded-lg`}
              key={element._id}
            >
              <div onClick={() => toggleAccordion(index)} className={`flex justify-between ${user.role === 'Admin' ? '' : 'cursor-pointer'}`}>
                <div className="flex-1">
                  <p className="text-xl font-medium text-blue-950">
                    {element.question}
                  </p>
                  <span className="text-sm text-gray-500">Subject: {element.subject}</span>
                  
                </div>
                {user.role === 'Admin' && (
                  <div className="flex">
                    
                    <button onClick={() => {
                        setEditingMode(element._id);
                        setEditData({ subject: element.subject, question: element.question, answer: element.answer });
                      }}
                      className={`p-2 bg-red-400 hover:bg-red-600 rounded text-white ${editingMode === element._id ? 'hidden' : 'block'}`}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteQues(element._id)} className="ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
                  </div>
                )}
              </div>
              {((activeIndex === index && user.role === 'Student') || user.role === 'Admin') && (
                <div className="mt-4">
                  {editingMode === element._id ? (
                    <>
                      <input
                        type="text"
                        value={editData.subject}
                        onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
                        className="m-2 p-2 border rounded"
                      />
                      <input
                        type="text"
                        value={editData.question}
                        onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                        className="m-2 p-2 border rounded"
                      />
                      <textarea
                        value={editData.answer}
                        onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                        className="w-full m-2 p-2 border rounded"
                      />
                    </>
                  ) : (
                    <p>{element.answer}</p>
                  )}
                  {editingMode === element._id && (
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => updateQuestion(element._id)}
                        className="mr-2 p-2 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingMode(null)}
                        className="p-2 bg-red-500 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterviewPrep;