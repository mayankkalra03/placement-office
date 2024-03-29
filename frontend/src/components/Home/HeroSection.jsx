import React from "react";

const HeroSection = () => {
  return (
    <div className=" text-gray-600 px-10">
      <div className="container mx-auto px-4 py-12">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-4 md:mb-0 md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Find a job that suits your interests and skills</h1>
            <p className="mt-2 text-base md:text-lg">
            Embark on a journey where your skills meet purpose, transforming passion into profession. Make everyday an opportunity to excel and inspire.
            </p>
          </div>
          <div className="md:w-1/2">
            <img src="/hero.png" alt="hero" className="animate-hover" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HeroSection;
