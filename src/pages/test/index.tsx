// DoubleSlider.js
import React, { useState } from 'react';

const DoubleSlider = () => {
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(7000);
  const min = 100;
  const max = 10000;

  const minThumb = ((minPrice - min) / (max - min)) * 100;
  const maxThumb = 100 - ((maxPrice - min) / (max - min)) * 100;

  const handleMinChange = (value) => {
    setMinPrice(Math.min(value, maxPrice - 500));
  };

  const handleMaxChange = (value) => {
    setMaxPrice(Math.max(value, minPrice + 500));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative max-w-xl w-full">
        <div>
          <input
            type="range"
            step="100"
            min={min}
            max={max}
            value={minPrice}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
          />
          <input
            type="range"
            step="100"
            min={min}
            max={max}
            value={maxPrice}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
          />
          <div className="relative z-10 h-2">
            <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
            <div className="absolute z-20 top-0 bottom-0 rounded-md bg-green-300" style={{ right: `${maxThumb}%`, left: `${minThumb}%` }}></div>
            <div className="absolute z-30 w-6 h-6 top-0 left-0 bg-green-600 rounded-full -mt-2 -ml-1" style={{ left: `${minThumb}%` }}></div>
            <div className="absolute z-30 w-6 h-6 top-0 right-0 bg-green-900 rounded-full -mt-2 -mr-3" style={{ right: `${maxThumb}%` }}></div>
          </div>
        </div>

        <div className="flex justify-between items-center py-5">
          <div>
            <input
              type="text"
              maxLength="5"
              value={minPrice}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
            />
          </div>
          <div>
            <input
              type="text"
              maxLength="5"
              value={maxPrice}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleSlider;
