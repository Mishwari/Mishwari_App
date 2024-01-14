import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import DoubleSlider from './DoubleSlider';

interface FilterGroupProps {
  filterBuses:any;
  setFilterBuses:any;
  isFilterOpen:boolean;
  setIsFilterOpen:any;
  filteredTrips:any;
}

function FilterGroup({
  filterBuses,
  setFilterBuses,
  isFilterOpen,
  setIsFilterOpen,
  filteredTrips
}:FilterGroupProps) {

  const [localFilters, setLocalFilters] = useState(filterBuses);

  useEffect(() => {
    setLocalFilters(filterBuses);
  }, [filterBuses, isFilterOpen]);

  const OnTarvelModeSelected = (e: any, busGroup: string) => {
    let selectedvalue = e.target.value; //mass

    if (busGroup === 'Rating') {
      selectedvalue = parseInt(selectedvalue, 10);
    }

    setLocalFilters((prevValue:any) => {
      const updatedValues = [...prevValue[busGroup]];

      if (e.target.checked) {
        updatedValues.push(selectedvalue);
      } else {
        const index = updatedValues.indexOf(selectedvalue);
        if (index > -1) {
          updatedValues.splice(index, 1);
        }
      }
      return {
        ...prevValue,
        [busGroup]: updatedValues,
      };
    });
  };

  const clearAllSelectedFilters = () => {
    // ...
    const clearedFilters = {
        BusType: [],
        Departure: [],
        Rating: [],
        Min:[initialMinPrice],
        Max:[initialMaxPrice],
    };

    setLocalFilters(clearedFilters);
};


// const clearAllSelectedFilters = () => {
//   setLocalFilters((prevState:any) => {
//     const newState = { ...prevState }; // Clone the current state
//     for (const key in newState) {
//       newState[key] = []; // Set each key's value to an empty array
//     }
//     return newState;
//   });
// };

  function areAllArraysEmpty(obj:any) {
    return Object.values(obj).every((arr:any) => arr.length === 0);
  }

  const showBusesHandler = () => {
    setFilterBuses(localFilters);
    setIsFilterOpen(false);
  };


  const [initialMinPrice, setInitialMinPrice] = useState(0)
  const [initialMaxPrice, setInitialMaxPrice] = useState(0)


  useEffect(() => {
    if (filteredTrips && filteredTrips.length > 0) {
      const prices = filteredTrips.map((trip: { price: any; }) => trip.price);  // Extract prices from trips
      setInitialMinPrice(Math.min(...prices));  // Spread operator to pass all prices as arguments
      setInitialMaxPrice(Math.max(...prices));
    }
    
  },[filteredTrips])



  useEffect(() => {
    setFilterBuses((prevState: any) => ({
      ...prevState,
      Min: [initialMinPrice],
      Max: [initialMaxPrice]
    }));
  }, [initialMinPrice, initialMaxPrice]);

  const handleMinPriceChange = (newMinPrice:any) => {
    setLocalFilters((prev:any) => ({
      ...prev,
      Min: newMinPrice
    }))
  }

  const handleMaxPriceChange = (newMaxPrice:any) => {
    setLocalFilters((prev:any) => ({
      ...prev,
      Max: newMaxPrice
    }))
  }



  return (
    <Transition.Root
      appear
      show={isFilterOpen}
      as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0  overflow-hidden z-10 '
        onClose={() => setIsFilterOpen(false)}>

        <div className='absolute inset-0 overflow-hidden'>
          <Dialog.Overlay className='absolute inset-0' />
          <div className='fixed inset-y-0 right-0  max-w-full flex'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'>
              <div className='w-screen max-w-md'>
                <div className='h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl'>
                  <div className='min-h-0 flex-1 flex flex-col py-3 px-0 overflow-y-scrollxx'>
                    <div className='flex justify-between '>
                      <div className='flex items-start justify-start gap-3 m-2'>
                        <button
                          type='button'
                          onClick={() => setIsFilterOpen(false)}
                          className='rotate-180 focus:outline-none'>
                          <Image
                            src='/icons/leftArrow.svg'
                            alt='leftArrow'
                            height={30}
                            width={30}
                          />
                        </button>
                        <Dialog.Title className='text-xl font-medium text-gray-900'>
                          الفلاتر
                        </Dialog.Title>
                      </div>
                      {!areAllArraysEmpty(localFilters) && (
                        <button
                          type='button'
                          onClick={clearAllSelectedFilters}
                          className='text-lg text-sky-700 pr-4'>
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className='mt-4 h-full  relative flex-1 px-4 sm:px-6'>
                      <>
                      {/* Bus type filter */}
                        <div>
                          <h1 className='font-bold'>نوع الباص </h1>
                          <div className='flex items-center gap-x-4 py-2'>
                            <label className={`border p-2 flex flex-col items-center rounded-lg ${localFilters['BusType'].includes('جماعي') ? 'bg-[#005587db]  text-white' : ' border-slate-300'}`}>
                              <input type='checkbox' value='جماعي' className='hidden'
                                checked={localFilters['BusType'].includes('جماعي')}
                                onChange={(e) => OnTarvelModeSelected(e,'BusType')}
                              />
                              <img  alt='جماعي' className='h-8 w-8'  src={`${localFilters['BusType'].includes('جماعي') ? '/icons/White_massbus.svg' : '/icons/Black_massbus.svg'}`}/>
                              <p className='text-base pt-1'>نقل جماعي</p>
                            </label>

                            <label className={`border p-2 flex flex-col items-center rounded-lg ${localFilters['BusType'].includes('بلكة') ? 'bg-[#005587db] text-white' : 'border-slate-300'}`}>
                              <input className='hidden' type='checkbox' value='بلكة'
                                checked={localFilters['BusType'].includes('بلكة')}
                                onChange={(e) => OnTarvelModeSelected(e,'BusType')}
                              />
                              <img alt='بلكة' className='h-8 w-8' src={`${localFilters['BusType'].includes('بلكة') ? '/icons/White_Bulkabus.svg' : '/icons/Black_Bulkabus.svg'}`}/>
                              <p className='text-base pt-1'>باص بلكة</p>
                            </label>
                          </div>
                          <p className='border-b border-slate-500 h-2 w-full'></p>
                        </div>

                        {/* Bus Departure */}
                        <div>
                          <h1 className='font-bold pt-1'>المغادرة من المكلا</h1>
                          <div className='flex items-center gap-x-2 py-2'>
                            <label className={`h-20 w-20 border py-2 flex flex-col items-center rounded-lg ${localFilters['Departure'].includes('morning') ?'bg-[#005587db] text-white' : ' border-slate-300'}`}>
                              <input className='hidden' type='checkbox' value='morning' checked={localFilters['Departure'].includes('morning')}
                                onChange={(e) => OnTarvelModeSelected(e, 'Departure')}
                              />
                              <img className='h-8 w-8' alt='massbus'
                                src={`${localFilters['Departure'].includes('morning') ? '/icons/White_Morning.svg' : '/icons/Black_Morning.svg'}`}  
                              />
                              <p className='text-base pt-1'>الصباح</p>
                            </label>

                            <label className={`h-20 w-20 border p-2 flex flex-col items-center rounded-lg ${localFilters['Departure'].includes('evening') ? 'bg-[#005587db] text-white' : ' border-slate-300'}`}>
                              <input 
                                className='hidden' 
                                type='checkbox' 
                                value='evening'
                                onChange={(e) =>OnTarvelModeSelected(e, 'Departure')}
                                checked={localFilters['Departure'].includes('evening')}
                              />
                              <img className='h-8 w-8' alt='evening' src= {`${localFilters['Departure'].includes('evening') ? '/icons/White_Evening.svg' : ' /icons/Black_Evening.svg'}`} />
                              <p className='text-base pt-1'>المساء</p>
                            </label>
                          </div>
                          <p className=' border-b border-slate-500 h-2 w-full'></p>
                        </div>

                        {/* Bus Rating */}
                        <div>
                          <h1 className='font-bold pt-1'>تقييم الباص</h1>
                          <div className='flex items-center flex-wrap gap-2 py-2'>
                            <label className={`border  px-2 py-0.5  rounded-full  flex  justify-center items-center ${localFilters['Rating'].includes(4) ? 'bg-[#005587db] text-white' : ' border-slate-300'}`}>
                              <input className='hidden' type='checkbox' value={4}
                                  checked={localFilters['Rating'].includes(4)}
                                  onChange={(e) =>OnTarvelModeSelected(e, 'Rating')}
                              />
                              <img className='h-6 w-6' alt='massbus'
                                src= {`${localFilters['Rating'].includes(4) ? '/icons/White_StarIcon.svg' : '/icons/Black_StarIcon.svg'}`}
                                />
                              <p className='text-base'>4 و اعلى</p>
                            </label>

                            <label className={`border px-2 py-0.5 rounded-full   flex  justify-center items-center ${localFilters['Rating'].includes(3) ? 'bg-[#005587db] text-white' : ' border-slate-300'}`}>
                              <input
                                className='hidden'
                                type='checkbox'
                                value={3}
                                checked={localFilters['Rating'].includes(3)}
                                onChange={(e) => OnTarvelModeSelected(e,'Rating') }
                              />
                              <img className='h-6 w-6'alt='massbus'
                                src= {`${localFilters['Rating'].includes(3) ? '/icons/White_StarIcon.svg' : '/icons/Black_StarIcon.svg'}`}
                              />
                              <p className='text-base'>3 و اعلى</p>
                            </label>

                            <label className={`border  px-2 py-0.5 rounded-full w-fit flex  justify-center items-center ${localFilters['Rating'].includes(2) ? 'bg-[#005587db] text-white' : ' border-slate-300'}`}>
                              <input 
                                className='hidden' 
                                type='checkbox' value={2} 
                                checked={localFilters['Rating'].includes(2)}
                                onChange={(e) => OnTarvelModeSelected(e, 'Rating')}
                              />
                              <img className='h-6 w-6' alt='massbus'
                                src= {`${localFilters['Rating'].includes(2) ? '/icons/White_StarIcon.svg' : '/icons/Black_StarIcon.svg'}`}
                                />
                              <p className='text-base'>2 و اعلى</p>
                            </label>
                          </div>
                          <p className='border-b border-slate-500 h-2 w-full'></p>
                        </div>

                        {/* Bus Cost */}

                        <div>
                          <h1 className='font-bold pt-1'>السعر</h1>

                             <DoubleSlider 
                             min={initialMinPrice}
                             max={initialMaxPrice}
                             modifiedMin={filterBuses.Min}
                             modifiedMax={filterBuses.Max}
                             onMinPriceChange={handleMinPriceChange}
                             onMaxPriceChange={handleMaxPriceChange}
                             />

                        </div>
                      </>
                    </div>
                  </div>
                  <div className='flex-shrink-0 px-4 py-4 flex justify-center'>
                    <button
                      type='submit'
                      onClick={showBusesHandler}
                      className='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#005687] hover:bg-[#148ace] focus:outline-none '>
                      Show Buses
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default FilterGroup;