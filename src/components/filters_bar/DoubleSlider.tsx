import React, { useState } from 'react';

interface DoubleSliderProps {
  min:number;
  max:number;
  onMinPriceChange:any;
  onMaxPriceChange:any;
  modifiedMin:any;
  modifiedMax:any;

}

function DoubleSlider ({min, max,onMinPriceChange,onMaxPriceChange,modifiedMin,modifiedMax}:DoubleSliderProps) {
  const [minPrice, setMinPrice] = useState<number>(Number(modifiedMin));
  const [maxPrice, setMaxPrice] = useState<number>(Number(modifiedMax));

  // const min = 100;
  // const max = 10000;
  
  const [inputMinPrice, setInputMinPrice] = useState<number>(Number(modifiedMin));
  const [inputMaxPrice, setInputMaxPrice] = useState<number>(Number(modifiedMax));
  
  const minThumb = ((minPrice - min) / (max - min)) * 100;
  const maxThumb = 100 - ((maxPrice - min) / (max - min)) * 100;

  const handleMinChange = (value:any) => {
    setMinPrice(Math.min(value, maxPrice - 500));
    onMinPriceChange(Math.min(value, maxPrice - 500))

  };

  const handleMaxChange = (value:any) => {
    setMaxPrice(Math.max(value, minPrice + 500));
    onMaxPriceChange(Math.max(value, minPrice + 500))

  };

  const handleInputMinChange = (e:any) => {
    setInputMinPrice(e.target.value);
  };

  const handleInputMaxChange = (e:any) => {
    setInputMaxPrice(e.target.value);
  };

  const handleMinBlur = () => {
    const newMinPrice = Math.max(min, Math.min(Number(inputMinPrice), maxPrice - 1));
    setMinPrice(newMinPrice);
    onMinPriceChange(newMinPrice)
  };

  const handleMaxBlur = () => {
    const newMaxPrice = Math.min(max, Math.max(Number(inputMaxPrice), minPrice + 1));
    setMaxPrice(newMaxPrice);
    onMaxPriceChange(newMaxPrice)
  };


  return (
    <div className=" flex justify-center items-center">
      <div className="relative max-w-xl w-full">
        <div className="flex justify-between items-center py-2 mb-5 gap-2">
          <div>
            <h1>من</h1>
            <input
              type="text"
              maxLength={5}
              value={inputMinPrice}
              onChange={(e) => {
                handleInputMinChange(e);    // Assuming handleInputMinChange can handle the event directly
                setMinPrice(Number(e.target.value)); // Directly set the minPrice state
              }}
              onBlur={handleMinBlur}
              className="font-bold px-1  border-1 border-gray-400 rounded-lg bg-[#ECF3F4] w-20 text-center focus:outline-[#005687]"
            />
          </div>
          <div>---</div>
          <div>
            <h1>الى</h1>
            <input
              type="text"
              maxLength={5}
              value={inputMaxPrice}
              onChange={(e) =>{
                handleInputMaxChange(e);
                setMaxPrice(Number(e.target.value))
              }}
              onBlur={handleMaxBlur}
              className="font-bold px-1  border-1 border-gray-400 rounded-lg bg-[#ECF3F4] w-20 text-center focus:outline-[#005687] "
            />
          </div>
          <div className='items-center text-center justify-center'>
            <a href="#" className='text-sky-700 '>Clear</a>
          </div>
        </div>
        <div>
          <input
            type="range"
            step="100"
            min={min}
            max={max}
            value={minPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              handleMinChange(value);
              setInputMinPrice(value);
            }}
            className="absolute pointer-events-none appearance-none z-20  w-full opacity-0 cursor-pointer"
          />
          <input
            type="range"
            step="100"
            min={min}
            max={max}
            value={maxPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              handleMaxChange(value);
              setInputMaxPrice(value);
            }}

            className="absolute pointer-events-none appearance-none z-20  w-full opacity-0 cursor-pointer  "
          />
          <div className="relative z-10 h-4 ">
            <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-lg bg-[#ECF3F4] border-1 border-[gray-400]"></div>
            <div className="absolute z-20 top-0 h-4 bottom-0 rounded-md bg-[#005687]" style={{ left: `${maxThumb}%`, right: `${minThumb}%` }}></div>
            <div className="flex items-center justify-center absolute z-30 w-8 h-8 top-0 right-0 bg-[#ECF3F4] border-1 border-[#005687] rounded-full -mt-2 " style={{ right: `${minThumb}%` }}>
              <div className='w-4 h-4 bg-[#005687] rounded-full  '></div>
            </div>
            <div className="flex items-center justify-center absolute z-30 w-8 h-8 top-0 left-0 bg-[#ECF3F4] border-1 border-[#005687] rounded-full -mt-2  -mr-2 cursor-pinter" style={{ left: `${maxThumb}%` }}>
              <div className='w-4 h-4 bg-[#005687] rounded-full  '></div>
            </div>
          </div>
          <div className='flex justify-between pl-1 mt-2'>
          <span>{min}</span>
          <span>{max}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoubleSlider;
