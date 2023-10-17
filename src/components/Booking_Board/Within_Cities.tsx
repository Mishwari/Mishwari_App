import React, { useState } from 'react'
import Testdata from '../testdata.json'
import Image from 'next/image';
import {useRouter} from 'next/router'

function Within_Cities() {

  const [stateName, setStateName] = useState<string[]>([]);
  const [Countrystate, setCountrystate] = useState([]);
  const [selectCity, setSelectCity] = useState<string>('');
  const [selectFrom, setSelectFrom] = useState<string>('');
  const [selectTo, setSelectTo] = useState<string>('');
  const [selectedMethods, setselectedMethods] = useState<string[]>([])

  const Toggle_Selected_City = (e: any) => {
    const getCountryName = e.target.value;
    const selectedcity: any = Testdata?.find((x) => x.country_name === getCountryName);
    console.log("selected City: ", selectedcity);
    setCountrystate(selectedcity);
    setStateName(selectedcity.states);
  };

  const OnTarvelModeSelected = (e: any) => {
    const selectedvalue = e.target.value;
    if (e.target.checked) {
      setselectedMethods((prevValue: any) => [...prevValue, selectedvalue])
    } else {
      setselectedMethods((prevValue) => prevValue.filter((item) => item !== selectedvalue))
    }
  }

  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/bus_list',
      query:{tripType: 1,  city:selectCity , pickup:selectFrom, destination: selectTo}
    })
    // alert("Selected Country:" + " " + selectCity + +"," + " From: " + " " + selectFrom + ", " + "To: " + " " + selectTo + " ," + "Travel Method by:" + " " + selectedMethods);
  };

  return (
    <div className='text-[#101010] p-4 h-96 md:h-[42vh] my-4 mx-2 rounded-3xl border border-slate-400 md:text-xl'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
        <div className='md:max-w-7xl'>
          <div>
            <h1 className='font-semibold text-md text-[#676767] pb-2'>City</h1>
            <select value={selectCity} onChange=
              {
                (e: React.ChangeEvent<HTMLSelectElement>) => 
                {
                  Toggle_Selected_City(e);
                  setSelectCity(e.target.value);
                }
              }
                className='h-10 w-64 md:w-96 px-2 text-lg font-medium text-[#676767] rounded-lg border border-[#005687]'
            >
              {
                Testdata?.map((item, index) => {
                  return (<option value={item.country_name} key={index}>{item.country_name}</option>)
                })
              }
            </select>
          </div>

          <h1 className='font-semibold text-md text-[#676767] pt-4'>From</h1>
          <div className='flex relative'>
            <div className='w-4 h-28 absolute -left-6 top-3 '>
              <img alt='fromtosvg' src='\icons\fromToIcon.svg' className='h-28 w-4 object-contain' />
            </div>
            <div className='flex flex-col pt-2'>
              <div>
                <select value={selectFrom} onChange={
                  (e: React.ChangeEvent<HTMLSelectElement>) => {
                    setSelectFrom(e.target.value)
                  }}
                  className='h-10 w-64 md:w-96 px-2 text-lg font-medium text-[#676767] rounded-lg border border-[#005687]'
                >
                  {stateName?.map((item: any, index) => {
                    return (<option value={item.state_name} key={index}>{item.state_name}</option>)
                  })}
                </select>
              </div>
              <div>
                <h1 className='font-semibold text-md text-[#676767] pt-4 pb-2'>To</h1>
                <select value={selectTo} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setSelectTo(e.target.value) }}
                  className='h-10 w-64 md:w-96 px-2 text-lg font-medium text-[#676767] rounded-lg border border-[#005687]'
                >
                  {stateName?.map((item: any, index) => {
                    return (<option value={item.state_name} key={index}>{item.state_name}</option>)
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className='-ml-9'>
            <h1 className='font-semibold text-md text-[#676767] pt-4'>Methods</h1>
            <div className='flex gap-x-2 pt-2'>

              <label className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${selectedMethods.includes('bulkabus') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
                <input onChange={(e) => OnTarvelModeSelected(e)} type="checkbox" value="bulkabus" className=' hidden checked:bg-black' />
                <Image alt='bulkabus' src="./bulka_bus.svg" height={20} width={20} className='h-14 w-16 mt-7 ' />
              </label>

              <label className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${selectedMethods.includes('Car') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
                <input onChange={(e) => OnTarvelModeSelected(e)} type="checkbox" value="Car" className=' hidden checked:bg-black' />
                <Image alt='car' src="./car.svg" height={20} width={20} className='h-14 w-16 mt-7 ' />
              </label>

              <label className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${selectedMethods.includes('Bike') ? 'bg-[#005687] border-2 border-black' : 'bg-[#e2e1e1]'}`}>
                <input onChange={(e) => OnTarvelModeSelected(e)} type="checkbox" value="Bike" className=' hidden checked:bg-black' />
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

export default Within_Cities