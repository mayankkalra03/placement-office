import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PlacementHighlights = () => {
  const data = [
    { year: '2019', "to-the-new": 8, nagarro: 6, ivp: 4, "app-inventive": 3, argil: 2, byjus: 15 },
    { year: '2020', "to-the-new": 11, nagarro: 8, ivp: 6, "app-inventive": 5, argil: 3, byjus: 12 },
    { year: '2021', "to-the-new": 10, nagarro: 9, ivp: 7, "app-inventive": 6, argil: 4, byjus: 18 },
    { year: '2022', "to-the-new": 14, nagarro: 7, ivp: 5, "app-inventive": 4, argil: 5, byjus: 10 },
    { year: '2023', "to-the-new": 12, nagarro: 10, ivp: 8, "app-inventive": 7, argil: 6, byjus: 20 }
  ];

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-800 m-8">Placement Highlights</h2>
      <div className='bg-white bg-opacity-80 ml-8 mr-8 p-8 rounded-lg shadow-xl'>
        <ResponsiveContainer width="95%" height={400}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(data[0]).filter(key => key !== 'year').map((key, index) => (
              <Line type="monotone" dataKey={key} stroke={getRandomColor()} key={index} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default PlacementHighlights;
