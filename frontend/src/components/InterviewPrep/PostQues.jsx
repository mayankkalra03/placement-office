import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';

const PostQues = () => {
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== 'Admin')) {
      navigateTo('/');
    }
  }, [isAuthorized, user, navigateTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quesData = { subject, question, answer };

    try {
      const response = await axios.post('http://localhost:3001/interview/postques', quesData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success(response.data.message);
      setSubject('');
      setQuestion('');
      setAnswer('');
    } catch (err) {
      toast.error(err.response?.data.message || 'An error occurred');
    }
  };

  return (
    <div className=" min-h-screen pt-8">
      <div className="container mx-auto max-w-4xl p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Post New Interview Question</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              rows="2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <textarea
              rows="2"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Answer"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostQues;
