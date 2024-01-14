import React, { useState } from 'react';
import Testdata from '../testdata.json';
import Image from 'next/image';
import { useRouter } from 'next/router';
import InputField from './InputField';
import FromToInputComponent from '../FromToInputComponent';

function Within_Cities() {
  const [stateName, setStateName] = useState<string>();
  const [Countrystate, setCountrystate] = useState([]);
  const [selectCity, setSelectCity] = useState<any>();
  const [selectFrom, setSelectFrom] = useState<any>();
  const [selectTo, setSelectTo] = useState<any>();
  const [selectedMethods, setselectedMethods] = useState<string[]>([]);

  const list = Testdata.map((item) => ({
    id: item.country_id,
    name: item.country_name,
  }));

  const Toggle_Selected_City = (e: any) => {
    const getCountryName = e.target.value;
    const selectedcity: any = Testdata?.find(
      (x) => x.country_name === getCountryName
    );
    setCountrystate(selectedcity);
    setStateName(selectedcity.states);
  };

  const OnTarvelModeSelected = (e: any) => {
    const selectedvalue = e.target.value;
    if (e.target.checked) {
      setselectedMethods((prevValue: any) => [...prevValue, selectedvalue]);
    } else {
      setselectedMethods((prevValue) =>
        prevValue.filter((item) => item !== selectedvalue)
      );
    }
  };

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/bus_list',
      query: {
        tripType: 1,
        city: selectCity,
        pickup: selectFrom,
        destination: selectTo,
      },
    });
    // alert("Selected Country:" + " " + selectCity + +"," + " From: " + " " + selectFrom + ", " + "To: " + " " + selectTo + " ," + "Travel Method by:" + " " + selectedMethods);
  };

  return (
    <div className='text-[#101010] my-4 md:text-xl'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center'>
        <div className='md:max-w-7xl pl-3 pr-2 md:pl-3 md:pr-2 py-2 h-fit rounded-3xl border border-slate-400 w-auto'>
          <div className='pr-7  pb-3 relative'>
            <h1 className='text-right font-regular text-sm text-[#676767] pt-3'>
              المدينة
            </h1>
            <InputField
              list={list}
              selected={selectCity}
              setSelected={setSelectCity}
            />
          </div>

          <FromToInputComponent
            list={list}
            selectFrom={selectFrom}
            selectTo={selectTo}
            setSelectFrom={setSelectFrom}
            setSelectTo={setSelectTo}
            isEditFromTo={false}
          />

          <div className='px-2'>
            <h1 className='text-right font-semibold text-md text-[#676767] pt-4'>
              {' '}
              وسيلة النقل
            </h1>
            <div className='flex flex-wrap  gap-x-2 pt-2'>
              <label
                className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${
                  selectedMethods.includes('Bike')
                    ? 'bg-[#005687] border-2 border-black'
                    : 'bg-[#e2e1e1]'
                }`}>
                <input
                  onChange={(e) => OnTarvelModeSelected(e)}
                  type='checkbox'
                  value='bus'
                  className=' hidden checked:bg-black'
                />
                <Image
                  alt='bus'
                  src='./bus.svg'
                  height={40}
                  width={40}
                  className='h-20 w-16 pb-2'
                />
              </label>

              <label
                className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${
                  selectedMethods.includes('bulkabus')
                    ? 'bg-[#005687] border-2 border-black'
                    : 'bg-[#e2e1e1]'
                }`}>
                <input
                  onChange={(e) => OnTarvelModeSelected(e)}
                  type='checkbox'
                  value='bulkabus'
                  className=' hidden checked:bg-black'
                />
                <Image
                  alt='bulkabus'
                  src='./bulka_bus.svg'
                  height={20}
                  width={20}
                  className='h-14 w-16 mt-7 '
                />
              </label>

              <label
                className={`flex flex-col items-center justify-center border w-20 h-14 rounded-lg border-[#005687] overflow-hidden ${
                  selectedMethods.includes('Car')
                    ? 'bg-[#005687] border-2 border-black'
                    : 'bg-[#e2e1e1]'
                }`}>
                <input
                  onChange={(e) => OnTarvelModeSelected(e)}
                  type='checkbox'
                  value='Car'
                  className=' hidden checked:bg-black'
                />
                <Image
                  alt='car'
                  src='./car.svg'
                  height={20}
                  width={20}
                  className='h-14 w-16 mt-7 '
                />
              </label>
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='w-40 md:w-72 mt-4 py-2 border-2 border-slate-700 text-white bg-[#005687] rounded-lg'>
          ابحث عن الرحلات
        </button>
      </form>
    </div>
  );
}

export default Within_Cities;
