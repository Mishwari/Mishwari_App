import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import Trips from '../api/trips.json';
import TripBox from '@/components/TripBox';


function index() {

  const [pickup, setPickup] = useState<string>('Seiyon')
  const [destination, setDestination] = useState<string>('AL-Mukalla')
  const [tripType, setTripType] = useState<number>(1)

  const filteredTrips = []
  for(let i = 0; i < Trips.length;i++){
    if(Trips[i].pickup == pickup && Trips[i].destination==destination){
      filteredTrips.push(Trips[i])
    }
  }

  console.log("Yoo heres some trips  !!  ", filteredTrips)



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
                <p className='text-xs font-bold underline'>{tripType==1?"Between Cities":"Within City / Seiyon"}</p>
                <h1 className='text-xl	font-bold	'>{pickup} - {destination}</h1>
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
          <div className='flex gap-2 '>
            <div
              className='rounded-full px-6  gap-1 flex items-center justify-center h-8'
              style={{
                width: 'auto',

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
            <Swiper
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
                  className='rounded-full px-3 flex items-center justify-center h-8'
                  style={{ backgroundColor: 'lightblue' }}>
                  <h2 className='m-0 mr-1'>Sort: Early Departure </h2>
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
                  className='rounded-full px-3 flex items-center justify-center h-8'
                  style={{ backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
              <SwiperSlide style={{ width: 'auto' }}>
                <div
                  className='rounded-full px-3 flex items-center justify-center'
                  style={{ height: '30px', backgroundColor: 'lightblue' }}>
                  <h2 className='m-0'>Sort: Early Departure</h2>
                </div>
              </SwiperSlide>
            </Swiper>
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
        {filteredTrips.map((trip: any, index) => {
          return <TripBox trip={trip} key={index} />;
        })}
      </section>
    </>
  );
}

export default index;
