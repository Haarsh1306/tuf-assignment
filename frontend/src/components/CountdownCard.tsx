import React from 'react';

interface CountdownCardProps {
  value: number;
  label: string;
}

const CountdownCard: React.FC<CountdownCardProps> = ({ value, label }) => (
  <div className="flex flex-col items-center mx-2">
    <div className="relative w-20 h-24 bg-red-800 rounded-lg shadow-lg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-1/2 bg-red-700 rounded-t-lg"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-white">{value.toString().padStart(2, '0')}</span>
      </div>
    </div>
    <span className="mt-2 text-sm text-red-300">{label}</span>
  </div>
);

export default CountdownCard;