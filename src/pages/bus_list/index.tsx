import React, { useEffect, useState, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import Trips from '../api/trips.json';
import TripBox from '@/components/TripBox';
import { useRouter } from 'next/router';


const customStyles = {
  swiper: {
    overflowY: 'visible',
    position: 'absolute',
  },
  dropdown: {
    zIndex: 1000,
  },
  swiperSlide: {
    position: 'absolute',
  },
};

function index() {
  
  const [pickup, setPickup] = useState<string>('Unknown');
  const [destination, setDestination] = useState<string>('Unknown');
  const [tripType, setTripType] = useState<number>(0);
 
 
  const sortList = [
    {id:1, name:"Departure Time"},
    {id:2, name:"Price"},
    {id:3, name:"Arrival Time"},
    {id:4, name:"Rating"}
  ]
  const [selectedSort, setSelectedSort] = useState<any>(sortList[0])
  console.log('selectedSort: ', selectedSort)
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

  const router = useRouter();
  useEffect(() => {
    if (router.query.pickup && router.query.destination) {
      setPickup(router.query.pickup as string);
      setDestination(router.query.destination as string);
    }
    if (router.query) {
      setTripType(Number(router.query.tripType));
    }
    console.log('tripType', router.query.tripType);
  }, [router.query]);

  const filteredTrips = [];
  for (let i = 0; i < Trips.length; i++) {
    if (Trips[i].pickup == pickup && Trips[i].destination == destination) {
      filteredTrips.push(Trips[i]);
    }
  }

 

  return (
    <>
      <div className='sticky top-0 z-10 bg-white pb-1'>
        <section className='my-2 '>
          <div className='flex justify-between w-full'>
            <div className='flex gap-4 pt-1'>
              <Link href='/'>
                <Image
                  src='/icons/leftArrow.svg'
                  alt='leftArrow'
                  height={30}
                  width={30}
                />
              </Link>
              <div className=''>
                <p className='text-xs font-bold underline'>
                  {tripType == 1
                    ? `Within City / ${router.query.city}`
                    :( tripType == 2
                    ? 'Between Cities'
                    : 'Unknown')}
                </p>
                <h1 className='text-xl	font-bold	'>
                  {pickup} - {destination}
                </h1>
              </div>
            </div>
            <div className='mr-5 mt-3 justify-self-end'>
              <Image
                src='/icons/editIcon.svg'
                alt='edit'
                height={25}
                width={25}
              />
            </div>
          </div>
        </section>
        <section className='m-3 mt-5'>
          <div className='flex gap-1 '>
            <div
              className='flex items-center justify-center rounded-full px-6  gap-1 w-[90px] h-[30px]'
              style={{
                
                backgroundColor: 'lightblue',
              }}>
              <Image
                src='/icons/filter.svg'
                alt='down arrow'
                width={22}
                height={22}
              />
              <h2 className='m-0 '>Filters </h2>
            </div>
            <div>
              
            </div>
            <div className='items-start justify-start overflow-hidden'>

            <Swiper
              style={customStyles.swiper}
              freeMode={true}
              grabCursor={true}
              spaceBetween={8}
              mousewheel={{
                invert: false,
              }}
              slidesPerView={'auto'}
              modules={[FreeMode, Mousewheel]}
              className=''>
              
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center  h-[30px]'
                  style={{ backgroundColor: 'lightblue' }}>
                  <Listbox value={selectedSort} onChange={setSelectedSort}>
                    {({ open }) => (
                      <>
                        <div className=" relative">
                          <Listbox.Button className=" flex gap-1  focus:outline-none ">
                            <span className=" ">Sort: {selectedSort.name}</span>
                            <span className="   items-center ">
                            <Image
                              src='/icons/downArrow.svg'
                              alt='down arrow'
                              width={25}
                              height={25}
                            />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute  mt-1 w-[100] bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {sortList.map((listItem) => (
                                <Listbox.Option
                                  key={listItem.id}
                                  className={({ active }) =>
                                    classNames(
                                      active ? 'text-[#005687] bg-[lightblue]' : 'text-gray-900',
                                      'cursor-default select-none relative py-2 pl-3 pr-9 '
                                    )
                                  }
                                  value={listItem}
                                >
                                  {({ selected, active }) => (
                                    <div className='flex w-max   justify-between  '>
                                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'mr-4 block truncate')}>
                                        {listItem.name}
                                      </span>

                                      {selectedSort.id == listItem.id ? (
                                        <span
                                          className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4 '
                                          )}
                                        >
                                          <Image src='/icons/checkListIcon.svg' alt="checkListIcon" className="stroke-[blue]" width={20} height={20} />
                                        </span>
                                      ) : null}
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                   </Listbox>
                  
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center h-[30px]'
                  style={{ backgroundColor: 'lightblue' }}>
                  <h2 className='m-0 mr-1'>Bus Type </h2>
                  <Image
                    src='/icons/downArrow.svg'
                    alt='down arrow'
                    width={25}
                    height={25}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center h-[30px]'
                  style={{ backgroundColor: 'lightblue' }}>
                  <h2 className='m-0 mr-1'>Departure Time (1)</h2>
                  <Image
                    src='/icons/downArrow.svg'
                    alt='down arrow'
                    width={25}
                    height={25}
                  />
                </div>
              </SwiperSlide>
             
            </Swiper>
            </div>
          </div>
        </section>
      </div>

      <section className='m-3   max-w-5xl '>
        <div
          className='flex rounded-xl 	 px-2  gap-4'
          style={{ backgroundColor: 'lightblue' }}>
          <Image
            src='/icons/busFrontView.svg'
            alt='bus front View'
            width={30}
            height={30}
          />
          <h2 className='m-0 text-sm'>
            <strong>{filteredTrips.length}</strong> Buses found, Starting from{' '}
            <strong>5000YR</strong> per passenger
          </h2>
        </div>

        {/* Trips Component */}
        {filteredTrips.length != 0 ? (
          filteredTrips.map((trip: any, index) => {
            return (
              <TripBox
                trip={trip}
                key={index}
              />
            );
          })
        ) : (
          <div className='flex flex-col items-center justify-center mt-9'>
            <div className='w-4/12 max-w-xl flex justify-center'>
              <Image
                src='/images/busNotFound.png'
                alt='bus not found'
                width={300}
                height={300}
                layout='responsive'
              />
            </div>
            <h1 className='text-2xl font-bold place-items-center mt-2 text-center text-black'>
              No Trips Found Within Your Selection
            </h1>
          </div>
        )}
      </section>
      
    </>
  );
}

export default index;
