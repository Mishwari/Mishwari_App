import React, { useState,useRef, useEffect } from 'react'
import Testdata from '../testdata.json'
import Image from 'next/image';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {useRouter} from 'next/router'





function Between_Cities() {

  const [Countrystate, setCountrystate] = useState([]);
  const [selectfromCity, setselectfromCity] = useState<string>('');
  const [selecttoCity, setselecttoCity] = useState<string>('');
  const [selectedMethods, setselectedMethods] = useState<string[]>([])
  const [selectedDate, setSelectedDate] =React.useState<Date>();
  const [togglecalenderbutton, settogglecalenderbutton] =useState(false)


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

<<<<<<< HEAD

  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/bus_list',
      query:{tripType: 2,  city:'', pickup: selectfromCity, destination: selecttoCity}
    })
    // alert("Selected CountryFrom: " + " " + selectfromCity + ", " + "To: " + " " + selecttoCity + " ," + "Travel Method by:" + " " + selectedMethods);
  };
=======
  const containerRef = useRef(null);
  // Close calendar on date selection
  const handleDayClick = (day:any, { selected }) => {
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


  const rendercalender=()=> {
    settogglecalenderbutton(!togglecalenderbutton)
  }


  const handleSubmit = () => {
    alert("Selected CountryFrom: " + " " + selectfromCity + ", " + "To: " + " " + selecttoCity + " ," + "Travel Method by:" + " " + selectedMethods);
  }
>>>>>>> hail
  return (
    <div className='text-[#101010] p-4 h-96 md:h-[42vh] my-4 mx-2 rounded-3xl border border-slate-400 md:text-xl'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
        <div>
          <h1 className='font-semibold text-md text-[#676767]'>from</h1>
          <select value={selectfromCity} onChange={
            (e: React.ChangeEvent<HTMLSelectElement>) => {
              Toggle_Selected_City(e);
              setselectfromCity(e.target.value);
            }
          }
            className='border-b py-1 text-lg font-medium text-[#676767] w-64 h-8 border-[#005687]'
          >
            {Testdata?.map((item, index) => {
              return (<option value={item.country_name} key={index}>{item.country_name}</option>)
            })}
          </select>
        </div>

        <div>
          <h1 className='font-semibold text-md text-[#676767]'>to</h1>
          <select value={selecttoCity} onChange={
            (e: React.ChangeEvent<HTMLSelectElement>) => {
              Toggle_Selected_City(e);
              setselecttoCity(e.target.value);
            }
          }
            className='border-b py-1 text-lg font-medium text-[#676767] w-64 h-8 border-[#005687]'
          >
            {Testdata?.map((item, index) => {
              return (<option value={item.country_name} key={index}>{item.country_name}</option>)
            })}
          </select>
        </div>
        <div>
          <h1 className='font-semibold text-md text-[#676767] pt-6'>Departure date</h1>
          <div ref={containerRef}>
          <Image onClick={rendercalender} alt='bulkabus' src="icons\calender.svg" height={20} width={20} className='' />
          {
            togglecalenderbutton 
            && <div className='bg-slate-300 text-[#005687] rounded-xl w-fit h-fit absolute'>
                 <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate} onDayClick={handleDayClick}/>
               </div>
          }        
          <h1>{selectedDate ? selectedDate.toDateString() : 'No date selected'}</h1>
          </div>
        </div>
        <h1 className='font-semibold text-md text-[#676767] pt-6 -ml-4'>Methods</h1>
        <div className='flex gap-x-2 pt-4'>

          <label className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${selectedMethods.includes('bulkabus') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
            <input onChange={OnTarvelModeSelected} type="checkbox" value="bulkabus" className=' hidden checked:bg-black' />
            <Image alt='bulkabus' src="./bulka_bus.svg" height={20} width={20} className='h-14 w-16 mt-7 ' />
          </label>

          <label className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${selectedMethods.includes('Car') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
            <input onChange={OnTarvelModeSelected} type="checkbox" value="Car" className=' hidden checked:bg-black' />
            <Image alt='car' src="./car.svg" height={20} width={20} className='h-14 w-16 mt-7 ' />
          </label>

          <label className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${selectedMethods.includes('Bike') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
            <input onChange={OnTarvelModeSelected} type="checkbox" value="Bike" className=' hidden checked:bg-black' />
            <Image alt='bulkabus' src="./bike.svg" height={20} width={20} className='h-14 w-16 mt-7 ' />
          </label>
        </div>
        <button type='submit' className='border-2 mt-12 p-3 w-40 border-black bg-[#005687] text-white  rounded-lg '>Search Trips</button>
      </form>
    </div>
  )
}
export default Between_Cities