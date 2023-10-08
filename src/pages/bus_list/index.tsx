import React ,{useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';

function index() {
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
              <p className='text-xs font-bold underline'>between cities</p>
              <h1 className='text-xl	font-bold	'>AL-Mukalla - Seiyon</h1>
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
                style={{  backgroundColor: 'lightblue' }}>
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
            <strong>123</strong> Buses found, Starting from{' '}
            <strong>5000YR</strong> per passenger
          </h2>
        </div>
              {/* Bus List component */}

              <div
          className='mt-5 justify-center sm:flex sm:gap-64 '
          style={{
            border: ' 0.5px solid #A4A4A4;',
            borderRadius: '12px',
          }}>
          <div className='flex justify-between md:gap-9 items-center p-4'>
            <div>
              <h1 className='text-xl font-bold'>Ben Sarhad Travels</h1>
              <h5 className='text-sm font-light'>Mass Bus - Cost Line</h5>
            </div>
            <div className='flex justify-center items-center rounded-xl bg-[#21C17A] px-1 py-0.5  '>
              <Image
                src='/icons/star.svg'
                alt='star'
                height={25}
                width={25}
              />
              <h1 className='text-white font-black pr-1.5 '>4.5</h1>
            </div>
          </div>
          <div className='flex p-4 md:gap-9 justify-between'>
            <div className=''>
              <div className='flex gap-1 items-center'>
                <h1 className='text-lg font-bold'>6:30 AM - 11:00 PM </h1>
                <h1 className='text-sm font-light'>(9h 30m)</h1>
              </div>
              <div className='flex gap-4 pt-2'>
                <Image
                  src='/icons/airConditionar.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/wifiIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/mobileIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
              </div>
            </div>
            <div>
              <h1 className='text-2xl font-black'>10000YR</h1>
              <h1 className='text-sm font-light text-center'>12 Seats Left</h1>
            </div>
          </div>
        </div>
        <div
          className='mt-5 justify-center sm:flex sm:gap-64 '
          style={{
            border: ' 0.5px solid #A4A4A4;',
            borderRadius: '12px',
          }}>
          <div className='flex justify-between md:gap-9 items-center p-4'>
            <div>
              <h1 className='text-xl font-bold'>Ben Sarhad Travels</h1>
              <h5 className='text-sm font-light'>Mass Bus - Cost Line</h5>
            </div>
            <div className='flex justify-center items-center rounded-xl bg-[#21C17A] px-1 py-0.5  '>
              <Image
                src='/icons/star.svg'
                alt='star'
                height={25}
                width={25}
              />
              <h1 className='text-white font-black pr-1.5 '>4.5</h1>
            </div>
          </div>
          <div className='flex p-4 md:gap-9 justify-between'>
            <div className=''>
              <div className='flex gap-1 items-center'>
                <h1 className='text-lg font-bold'>6:30 AM - 11:00 PM </h1>
                <h1 className='text-sm font-light'>(9h 30m)</h1>
              </div>
              <div className='flex gap-4 pt-2'>
                <Image
                  src='/icons/airConditionar.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/wifiIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/mobileIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
              </div>
            </div>
            <div>
              <h1 className='text-2xl font-black'>10000YR</h1>
              <h1 className='text-sm font-light text-center'>12 Seats Left</h1>
            </div>
          </div>
        </div>
        <div
          className='mt-5 justify-center sm:flex sm:gap-64 '
          style={{
            border: ' 0.5px solid #A4A4A4;',
            borderRadius: '12px',
          }}>
          <div className='flex justify-between md:gap-9 items-center p-4'>
            <div>
              <h1 className='text-xl font-bold'>Ben Sarhad Travels</h1>
              <h5 className='text-sm font-light'>Mass Bus - Cost Line</h5>
            </div>
            <div className='flex justify-center items-center rounded-xl bg-[#21C17A] px-1 py-0.5  '>
              <Image
                src='/icons/star.svg'
                alt='star'
                height={25}
                width={25}
              />
              <h1 className='text-white font-black pr-1.5 '>4.5</h1>
            </div>
          </div>
          <div className='flex p-4 md:gap-9 justify-between'>
            <div className=''>
              <div className='flex gap-1 items-center'>
                <h1 className='text-lg font-bold'>6:30 AM - 11:00 PM </h1>
                <h1 className='text-sm font-light'>(9h 30m)</h1>
              </div>
              <div className='flex gap-4 pt-2'>
                <Image
                  src='/icons/airConditionar.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/wifiIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/mobileIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
              </div>
            </div>
            <div>
              <h1 className='text-2xl font-black'>10000YR</h1>
              <h1 className='text-sm font-light text-center'>12 Seats Left</h1>
            </div>
          </div>
        </div>
        <div
          className='mt-5 justify-center sm:flex sm:gap-64 '
          style={{
            border: ' 0.5px solid #A4A4A4;',
            borderRadius: '12px',
          }}>
          <div className='flex justify-between md:gap-9 items-center p-4'>
            <div>
              <h1 className='text-xl font-bold'>Ben Sarhad Travels</h1>
              <h5 className='text-sm font-light'>Mass Bus - Cost Line</h5>
            </div>
            <div className='flex justify-center items-center rounded-xl bg-[#21C17A] px-1 py-0.5  '>
              <Image
                src='/icons/star.svg'
                alt='star'
                height={25}
                width={25}
              />
              <h1 className='text-white font-black pr-1.5 '>4.5</h1>
            </div>
          </div>
          <div className='flex p-4 md:gap-9 justify-between'>
            <div className=''>
              <div className='flex gap-1 items-center'>
                <h1 className='text-lg font-bold'>6:30 AM - 11:00 PM </h1>
                <h1 className='text-sm font-light'>(9h 30m)</h1>
              </div>
              <div className='flex gap-4 pt-2'>
                <Image
                  src='/icons/airConditionar.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/wifiIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/mobileIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
              </div>
            </div>
            <div>
              <h1 className='text-2xl font-black'>10000YR</h1>
              <h1 className='text-sm font-light text-center'>12 Seats Left</h1>
            </div>
          </div>
        </div>
        <div
          className='mt-5 justify-center sm:flex sm:gap-64 '
          style={{
            border: ' 0.5px solid #A4A4A4;',
            borderRadius: '12px',
          }}>
          <div className='flex justify-between md:gap-9 items-center p-4'>
            <div>
              <h1 className='text-xl font-bold'>Ben Sarhad Travels</h1>
              <h5 className='text-sm font-light'>Mass Bus - Cost Line</h5>
            </div>
            <div className='flex justify-center items-center rounded-xl bg-[#21C17A] px-1 py-0.5  '>
              <Image
                src='/icons/star.svg'
                alt='star'
                height={25}
                width={25}
              />
              <h1 className='text-white font-black pr-1.5 '>4.5</h1>
            </div>
          </div>
          <div className='flex p-4 md:gap-9 justify-between'>
            <div className=''>
              <div className='flex gap-1 items-center'>
                <h1 className='text-lg font-bold'>6:30 AM - 11:00 PM </h1>
                <h1 className='text-sm font-light'>(9h 30m)</h1>
              </div>
              <div className='flex gap-4 pt-2'>
                <Image
                  src='/icons/airConditionar.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/wifiIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/mobileIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
              </div>
            </div>
            <div>
              <h1 className='text-2xl font-black'>10000YR</h1>
              <h1 className='text-sm font-light text-center'>12 Seats Left</h1>
            </div>
          </div>
        </div>
        <div
          className='mt-5 justify-center sm:flex sm:gap-64 '
          style={{
            border: ' 0.5px solid #A4A4A4;',
            borderRadius: '12px',
          }}>
          <div className='flex justify-between md:gap-9 items-center p-4'>
            <div>
              <h1 className='text-xl font-bold'>Ben Sarhad Travels</h1>
              <h5 className='text-sm font-light'>Mass Bus - Cost Line</h5>
            </div>
            <div className='flex justify-center items-center rounded-xl bg-[#21C17A] px-1 py-0.5  '>
              <Image
                src='/icons/star.svg'
                alt='star'
                height={25}
                width={25}
              />
              <h1 className='text-white font-black pr-1.5 '>4.5</h1>
            </div>
          </div>
          <div className='flex p-4 md:gap-9 justify-between'>
            <div className=''>
              <div className='flex gap-1 items-center'>
                <h1 className='text-lg font-bold'>6:30 AM - 11:00 PM </h1>
                <h1 className='text-sm font-light'>(9h 30m)</h1>
              </div>
              <div className='flex gap-4 pt-2'>
                <Image
                  src='/icons/airConditionar.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/wifiIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/mobileIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
              </div>
            </div>
            <div>
              <h1 className='text-2xl font-black'>10000YR</h1>
              <h1 className='text-sm font-light text-center'>12 Seats Left</h1>
            </div>
          </div>
        </div>
        <div
          className='mt-5 justify-center sm:flex sm:gap-64 '
          style={{
            border: ' 0.5px solid #A4A4A4;',
            borderRadius: '12px',
          }}>
          <div className='flex justify-between md:gap-9 items-center p-4'>
            <div>
              <h1 className='text-xl font-bold'>Ben Sarhad Travels</h1>
              <h5 className='text-sm font-light'>Mass Bus - Cost Line</h5>
            </div>
            <div className='flex justify-center items-center rounded-xl bg-[#21C17A] px-1 py-0.5  '>
              <Image
                src='/icons/star.svg'
                alt='star'
                height={25}
                width={25}
              />
              <h1 className='text-white font-black pr-1.5 '>4.5</h1>
            </div>
          </div>
          <div className='flex p-4 md:gap-9 justify-between'>
            <div className=''>
              <div className='flex gap-1 items-center'>
                <h1 className='text-lg font-bold'>6:30 AM - 11:00 PM </h1>
                <h1 className='text-sm font-light'>(9h 30m)</h1>
              </div>
              <div className='flex gap-4 pt-2'>
                <Image
                  src='/icons/airConditionar.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/wifiIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
                <Image
                  src='/icons/mobileIcon.svg'
                  alt='wifi logo'
                  height={15}
                  width={15}
                />
              </div>
            </div>
            <div>
              <h1 className='text-2xl font-black'>10000YR</h1>
              <h1 className='text-sm font-light text-center'>12 Seats Left</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default index;
