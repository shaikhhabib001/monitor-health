
import React from 'react';

const StatCard = ({ title, value, unit, icon }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold">
          {value} <span className="text-base font-normal">{unit}</span>
        </p>
      </div>
    </div>
  );
};

export default StatCard;
