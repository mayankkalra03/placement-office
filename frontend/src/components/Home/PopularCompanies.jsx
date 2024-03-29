import React, { useEffect, useState } from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const majorRecruiters = [
    { id: 1, name: 'to-the-new', website: 'https://www.tothenew.com' },
    { id: 2, name: 'nagarro', website: 'https://www.nagarro.com' },
    { id: 3, name: 'ivp', website: 'https://www.ivp.com' },
    { id: 4, name: 'app-inventive', website: 'https://www.app-inventive.com' },
    { id: 5, name: 'argil', website: 'https://www.argil.com' },
    { id: 6, name: 'byjus', website: 'https://www.byjus.com' },
    { id: 7, name: 'cvent', website: 'https://www.cvent.com' },
    { id: 8, name: 'foresight', website: 'https://www.foresight.com' },
    { id: 9, name: 'forest-lake', website: 'https://www.forestlake.com' },
    { id: 10, name: 'gemalto', website: 'https://www.gemalto.com' },
    { id: 11, name: 'hitachi-consulting', website: 'https://www.hitachi.com' },
    { id: 12, name: 'infosys', website: 'https://www.infosys.com' },
    { id: 13, name: 'knoldus', website: 'https://www.knoldus.com' },
    { id: 14, name: 'symbiotic', website: 'https://www.infosys.com' },
    { id: 15, name: 'zs', website: 'https://www.zs.com' },
  ];
  


  return (
    <div className="mt-8">
        <h3 className="text-2xl font-bold text-center mb-8">OUR MAJOR RECRUITERS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 mb-10">
          {majorRecruiters.map((company) => (
            <div key={company.id} className="bg-white p-4 rounded shadow-md text-center transition duration-300 ease-in-out hover:scale-105">
              <img src={`/logos/${company.name}.jpg`} alt={company.name} className="mx-auto mb-2" />
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Visit Website
              </a>
            </div>
          ))}
        </div>
    </div>
  );
};

export default PopularCompanies;
