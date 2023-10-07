import React, { useState } from 'react'
import Testdata from '../testdata.json'
import Image from 'next/image';
function Within_Cities() {
  const [stateName, setStateName] = useState<string[]>([]);
  const [Countrystate, setCountrystate] = useState([]);
  const [selectCity, setSelectCity] = useState<string>('');
  const [selectFrom, setSelectFrom] = useState<string>('');
  const [selectTo, setSelectTo] = useState<string>('');
  const [TravelMethod, setTravelMethod] = useState<string>('');

  const Toggle_Selected_City = (e: any) => {
    const getCountryName = e.target.value;
    const selectedcity: any = Testdata?.find((x) => x.country_name === getCountryName);
    console.log("selected City: ", selectedcity);
    setCountrystate(selectedcity);
    setStateName(selectedcity.states);
  };
  const handleSubmit = () => {
    alert("Selected Country: " + selectCity + " From: " + selectFrom + " To: " + selectTo + "Travel Method by:" + TravelMethod);
  };

  function OnTarvelModeChanged(e: any) {
    const res = e.target.value
    setTravelMethod(res);
  }
  const SvgIcons = [
    {
      id: "svg-1",
      SvgName: "BulkaBus",
      SvgLink: "/bulka_bus.svg"
    },
    {
      id: "svg-2",
      SvgName: "Car",
      SvgLink: "/car.svg"
    },
    {
      id: "svg-3",
      SvgName: "Bike",
      SvgLink: "/bike.svg"
    },
  ]

  return (
    <div className='text-[#101010] px-4'>
      <form
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className='font-semibold text-md text-[#676767]'>City</h1>
          <select value={selectCity} onChange={
            (e: React.ChangeEvent<HTMLSelectElement>) => {
              Toggle_Selected_City(e);
              setSelectCity(e.target.value);
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
          <h1 className='font-semibold text-md text-[#676767] pt-6'>From</h1>
          <select value={selectFrom} onChange={
            (e: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectFrom(e.target.value)
            }}
            className='border-b py-1 text-lg font-medium text-[#676767] w-64 h-8 border-[#005687]'
          >
            {stateName?.map((item: any, index) => {
              return (<option value={item.state_name} key={index}>{item.state_name}</option>)
            })}
          </select>
        </div>

        <div>
          <h1 className='font-semibold text-md text-[#676767] pt-6'>To</h1>
          <select value={selectTo} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setSelectTo(e.target.value) }}
            className='border-b py-1 text-lg font-medium text-[#676767] w-64 h-8 border-[#005687]'
          >
            {stateName?.map((item: any, index) => {
              return (<option value={item.state_name} key={index}>{item.state_name}</option>)
            })}
          </select>
        </div>

        <h1 className='font-semibold text-md text-[#676767] pt-6 -ml-4'>Method</h1>
        <div className='flex gap-x-2 pt-4'>
          {
            SvgIcons.map((item: any) => {
              return (
                <div onChange={OnTarvelModeChanged} className={`border   w-fit h-14 rounded-lg border-[#005687] bg-[#cbd8df]`}>
                  <input type='radio' value={item.SvgName} checked={TravelMethod === item.SvgName} />
                  <label ><Image alt='bulka_bus' src={item.SvgLink} height={1} width={1} className=' h-20 pt-4 w-20 pb-2 ' /></label>
                </div>
              )
            })
          }
        </div>
        <button type='submit' className='border-2 mt-12 p-3 w-40  border-black bg-[#005687] text-white  rounded-lg '>Search Trips</button>
      </form>
    </div>
  )
}

export default Within_Cities