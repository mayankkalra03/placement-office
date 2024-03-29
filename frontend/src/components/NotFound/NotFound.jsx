import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <img src="/notfound.png" alt="Not Found" className="mx-auto w-3/4 max-w-lg animate-hover" />
        <Link to="/" className="mt-6 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
          RETURN TO HOME PAGE
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
