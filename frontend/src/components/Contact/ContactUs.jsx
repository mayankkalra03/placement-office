import React, { useContext, useState } from 'react';
import emailjs from 'emailjs-com';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const navigate = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  if (isAuthorized && user.role !== 'Student') {
    navigate('/');
    return null;
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_c5ixhgm', 'template_z09sqve', e.target, 'TsWsOStEDjTM4EVNM')
      .then((result) => {
          console.log(result.text);
          toast.success("Your message has been sent successfully!");
          e.target.reset();
      }, (error) => {
          console.log(error.text);
          toast.error("Failed to send the message. Please try again.");
      });
  };


  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-10">
      <div className="flex-1 max-w-md mx-auto mb-10 md:mb-0">
        <h1 className='text-3xl font-bold text-center text-blue-950'>Let's connect....</h1>
        <img src="/contact-us.png" alt="Contact Us" className="object-cover animate-hover" />
      </div>

      <div className="flex-1 max-w-md mx-auto bg-white p-8 shadow-lg rounded">
        <form className="contact-form space-y-4" onSubmit={sendEmail}>
        <div>
          <label htmlFor="user_name" className="text-gray-600">Name</label>
          <input type="text" name="user_name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="user_email" className="text-gray-600">Email</label>
          <input type="email" name="user_email" className="mt-1 block w-full px-3 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="subject" className="text-gray-600">Subject</label>
          <input type="text" name="subject" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="message" className="text-gray-600">Message</label>
          <textarea name="message" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <input type="submit" value="Send" className="mt-4 px-4 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 cursor-pointer block w-full" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;