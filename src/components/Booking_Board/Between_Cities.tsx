import React, { useState, useRef, useEffect } from 'react'
import Testdata from '../testdata.json'
import Image from 'next/image';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useRouter } from 'next/router'

function Between_Cities() {

  const [Countrystate, setCountrystate] = useState([]);
  const [selectfromCity, setselectfromCity] = useState<string>('');
  const [selecttoCity, setselecttoCity] = useState<string>('');
  const [selectedMethods, setselectedMethods] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [togglecalenderbutton, settogglecalenderbutton] = useState(false)
  const CurrentTime = new Date();
  const options: any = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };

  const Toggle_Selected_City = (e: any) => {
    const getCountryName = e.target.value;
    const selectedcity: any = Testdata?.find((x) => x.country_name === getCountryName);
    console.log("selected City: ", selectedcity);
    setCountrystate(selectedcity);
  };

  const OnTarvelModeSelected = (e: any) => {
    const selectedvalue = e.target.value;
    if (e.target.checked) {
      setselectedMethods((prevValue: any) => [...prevValue, selectedvalue])
    } else {
      setselectedMethods((prevValue) => prevValue.filter((item) => item !== selectedvalue))
    }
    console.log(selectedMethods)
  }

  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/bus_list',
      query: { tripType: 2, city: '', pickup: selectfromCity, destination: selecttoCity }
    })
    // alert("Selected CountryFrom: " + " " + selectfromCity + ", " + "To: " + " " + selecttoCity + " ," + "Travel Method by:" + " " + selectedMethods);
  };

  const containerRef = useRef(null);
  // Close calendar on date selection
  const handleDayClick = (day: any, { selected }) => {
    setSelectedDate(selected ? undefined : day);
    settogglecalenderbutton(false);
  };

  // Add an event listener to close the calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        settogglecalenderbutton(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const rendercalender = () => {
    settogglecalenderbutton(!togglecalenderbutton)
  }

  return (
    <div className='text-[#101010] h-96 md:h-[42vh] my-4 mx-2 rounded-3xl border border-slate-400 md:text-xl'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
        <div className='md:max-w-7xl'>
          <div className=' py-3 pl-8 md:pl-0'>
            <h1 className='font-semibold text-md text-[#676767] pb-2'>from</h1>
            <div className='flex relative'>
              <div className='w-4 h-28 absolute -left-6 top-3 '>
                <img alt='fromtosvg' src='\icons\fromToIcon.svg' className='h-28 w-4 object-contain' />
              </div> 
              <select value={selectfromCity} onChange={
                (e: React.ChangeEvent<HTMLSelectElement>) => {
                  Toggle_Selected_City(e);
                  setselectfromCity(e.target.value);
                }
              }
                className='h-10 w-64 md:w-96 px-2 text-lg font-medium text-[#676767] rounded-lg border border-[#005687]'          >
                {Testdata?.map((item, index) => {
                  return (<option value={item.country_name} key={index}>{item.country_name}</option>)
                })}
              </select>
            </div>
            <div>
              <h1 className='font-semibold text-md text-[#676767] pb-2 pt-4'>to</h1>
              <select value={selecttoCity} onChange={
                (e: React.ChangeEvent<HTMLSelectElement>) => {
                  Toggle_Selected_City(e);
                  setselecttoCity(e.target.value);
                }
              }
                className='h-10 w-64 md:w-96 px-2 text-lg font-medium text-[#676767] rounded-lg border border-[#005687]'          >
                {Testdata?.map((item, index) => {
                  return (<option value={item.country_name} key={index}>{item.country_name}</option>)
                })}
              </select>
            </div>
          </div>
        
          <div >
            <div>
              <h1 className='font-semibold text-md text-[#676767] pt-4 pb-2'>Departure date</h1>
              <div ref={containerRef} className='flex items-center justify-between'>
                <div className='flex justify-center items-center'>
                  <Image onClick={rendercalender} alt='calender' src="icons\calender.svg" height={20} width={25} />
                  {
                    togglecalenderbutton
                    && <div className='bg-slate-300 text-[#005687] rounded-xl absolute'>
                      <DayPicker className='w-72 h-72' mode="single" selected={selectedDate} onSelect={setSelectedDate} onDayClick={handleDayClick} />
                    </div>
                  }
                  <h1 className='pl-2 font-light text-base'>{selectedDate ? selectedDate.toDateString() : `${CurrentTime.toLocaleDateString('en-US', options)}`}</h1>
                </div>
                <div className=' '>
                  <button className='h-8 w-16 border border-slate-300 rounded-lg  text-lg text-[#676767] bg-slate-100'>Today</button>
                  <button className='h-8 w-24  border border-slate-300 rounded-lg  text-lg text-[#676767]'>Tomorrow</button>
                </div>
              </div>
            </div>
            <h1 className='font-semibold text-md text-[#676767] pt-4'>Methods</h1>
            <div className='flex gap-x-2 pt-2'>

              <label className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${selectedMethods.includes('bulkabus') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
                <input onChange={OnTarvelModeSelected} type="checkbox" value="bulkabus" className=' hidden checked:bg-black' />
                <Image alt='bulkabus' src="./bulka_bus.svg" height={20} width={20} className='h-14 w-16 mt-7 ' />
              </label>

              <label className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${selectedMethods.includes('Car') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
                <input onChange={OnTarvelModeSelected} type="checkbox" value="Car" className=' hidden checked:bg-black' />
                <Image alt='car' src="./car.svg" height={20} width={20} className='h-14 w-16 mt-7' />
              </label>

              <label className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${selectedMethods.includes('Bike') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
                <input onChange={OnTarvelModeSelected} type="checkbox" value="Bike" className=' hidden checked:bg-black' />
                <Image alt='bulkabus' src="./bike.svg" height={20} width={20} className='h-14 w-16 mt-7 ' />
              </label>
            </div>
          </div>
        </div>
        <button type='submit' className='w-40 md:w-72 mt-6 py-2 border-2 border-slate-700 text-white bg-[#005687] rounded-lg'>Search Trips</button>
      </form>
    </div>
  )
}
export default Between_Cities