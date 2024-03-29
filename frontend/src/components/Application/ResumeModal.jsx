import React from "react";

const ResumeModal = ({ imageUrl, onClose, applicantName }) => {
  const filename = `${applicantName}-resume`; 

  const downloadImage = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative p-4 w-full max-w-4xl h-full md:h-auto flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <img src={imageUrl} alt="Resume" className="max-w-full h-auto max-h-[90vh] mb-4" />
          <div className="flex space-x-4">
            <button
              onClick={() => downloadImage(imageUrl, filename)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Download Resume
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
