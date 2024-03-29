import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PlacementHighlights = () => {
    const data = [
        { year: '2019', Google: 10, Amazon: 5, Facebook: 3 },
        { year: '2020', Google: 12, Amazon: 7, Facebook: 4 },
        { year: '2021', Google: 15, Amazon: 11, Facebook: 5 },
        { year: '2022', Google: 20, Amazon: 13, Facebook: 10 },
        { year: '2023', Google: 22, Amazon: 15, Facebook: 12 },
      ];
  return (
    <>
        <h2 className="text-3xl font-bold text-center text-gray-800 m-8">PLACEMENT HIGHLIGHTS</h2>
    
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
