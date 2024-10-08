 import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import TripBox from '@/components/TripBox';
import SortDropdown from '@/components/filters_bar/SortDropdown';
import { useRouter } from 'next/router';
import FilterGroupModal from '@/components/filters_bar/FilterGroupModal';
import axios from 'axios';
import EditFromTo from '@/components/filter/EditFromTo';
import { Trip } from '@/types/trip'; // TODO
import BackButton from '@/components/BackButton';
import FilterGroup from '@/components/filters_bar/FilterGroup';

export type SortItem = {
  id: number;
  name: string;
};





const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function index() {

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const [pickup, setPickup] = useState<string>('Unknown');
  const [destination, setDestination] = useState<string>('Unknown');
  const [tripType, setTripType] = useState<number>(0);
  
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.pickup && router.query.destination) {
      setPickup(router.query?.pickup as string);
      setDestination(router.query?.destination as string);
    }
    if (router.query.tripType) {
      setTripType(Number(router.query.tripType));
    }
  }, [router.query, router.isReady]);

  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]); //9 ref

  const [finalFilteredTrips, setFinalFilteredTrips] = useState<object[]>([]);

  const [filterBuses, setFilterBuses] = useState<any>({
    BusType: [],
    Departure: [],
    Rating: [],
    Min: [],
    Max: [],
  });

  const [isEditFromTo, setIsEditFromTo] = useState<boolean>(false);

  const sortList = [
    { id: 1, name: 'وقت المغادرة' },
    { id: 2, name: 'الارخص' },
    { id: 3, name: 'وقت الوصول' },
    { id: 4, name: 'الاعلى تقييماً' },
  ];
  const [selectedSort, setSelectedSort] = useState<SortItem>(sortList[0]);

  // Filters


  useEffect(() => {

    if (!router.isReady) return;

    const fetchTrips = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}trips/?pickup=${router.query.pickup}&destination=${router.query.destination}`);
        // const response = await axios.get(`${apiBaseUrl}test-get/`);
        setFilteredTrips(response.data);
      } catch (err:any) {
        console.log('Error Message: ', err.message);
        if (err.response) {
          console.error('Error response:', err.response.data);
          console.error('Error response status:', err.response.status);
          console.error('Error response headers:', err.response.headers);
        } else if (err.request) {
          console.error('Error request:', err.request);
        } else {
          console.error('Error message:', err.message);
        }
      }
    };
    fetchTrips();
  }, [router.isReady, router.query.pickup, router.query.destination]);

  useEffect(() => {
    let newFinal = [];
    for (let i = 0; i < filteredTrips?.length; i++) {
      if (
        (filterBuses.BusType.length === 0 ||
          filterBuses.BusType.includes(filteredTrips[i].main_trip.bus.bus_type)) &&
        (filterBuses.Rating.length === 0 ||
          Number(filteredTrips[i].main_trip.driver?.driver_rating) >
            Math.min(...filterBuses.Rating)) &&
        filteredTrips[i].price >= Number(filterBuses.Min) &&
        filteredTrips[i].price <= Number(filterBuses.Max)
      ) {
        newFinal.push(filteredTrips[i]);
      }
    }
    setFinalFilteredTrips(newFinal);
  }, [filteredTrips, filterBuses]);

  // For minPrice only
  const [minimumTrip, setMinimumTrip] = useState(0);

  useEffect(() => {
    if (finalFilteredTrips && finalFilteredTrips.length > 0) {
      const prices = finalFilteredTrips.map((trip:any) => trip.price); // Extract prices from trips
      setMinimumTrip(Math.min(...prices)); // Spread operator to pass all prices as arguments
    }
    finalFilteredTrips;
  }, [finalFilteredTrips]);

  useEffect(() => {
    if (selectedSort.id == 1) {
      const sortedTrips = [...filteredTrips].sort((a, b) => {
        const departureTimeA:any = new Date(a.departure_time);
        const departureTimeB:any = new Date(b.departure_time);
        return departureTimeA - departureTimeB;
      });
      setFilteredTrips(sortedTrips);
      // arrival time
    } else if (selectedSort.id == 3) {
      const sortedTrips = [...filteredTrips].sort((a, b) => {
        const arrivalTimeA:any = new Date(a.arrival_time);
        const arrivalTimeB:any = new Date(b.arrival_time);
        return arrivalTimeA - arrivalTimeB;
      });
      setFilteredTrips(sortedTrips);
    } else if (selectedSort.id == 2) {
      const sortedTrips = [...filteredTrips].sort((a, b) => a.price - b.price);
      setFilteredTrips(sortedTrips);
    }
    //rate
    else if (selectedSort.id == 4) {
      const sortedTrips:Trip[] = [...filteredTrips].sort(
        (a, b) => Number(b.main_trip.driver?.driver_rating) - Number(a.main_trip.driver?.driver_rating)
      );
      setFilteredTrips(sortedTrips);
    }
  }, [selectedSort]);

  return (
    <div className='flex flex-col items-center bg-[#F4FAFE] bg-scroll h-full '>
      <div className='pb-4 sticky top-0 w-full z-10  bg-[#005687] overflow-hidden'>
        <section className='my-2'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4 pt-1 mr-2'>
              <BackButton />

              <div className='text-white'>
                <p className='text-right text-xs font-bold underline'>
                  {tripType == 1
                    ? `داخل المدينة / ${router.query.city}`
                    : tripType == 2
                    ? 'بين المدن'
                    : 'غير معروف'}
                </p>
                <h1 className='text-xl	font-bold	'>
                  {pickup} - {destination}
                </h1>
              </div>
            </div>
            <div
              onClick={() => setIsEditFromTo(true)}
              className='ml-5 mt-3 justify-self-end cursor-pointer  '>
              <Image
                src='/icons/editIcon.svg'
                alt='edit'
                height={25}
                width={25}
              />
            </div>

            <EditFromTo
              isEditFromTo={isEditFromTo}
              setIsEditFromTo={setIsEditFromTo}
              pickup={pickup}
              destination={destination}
              // setPickup={setPickup}
              // setDestination={setDestination}
            />
          </div>
        </section>
        <section className='m-3 mt-5 '>
          <div className='md:hidden flex gap-2 '>
            <div
              className='flex items-center justify-center rounded-full px-6  gap-1.5 w-[90px] h-[30px]'
              style={{
                backgroundColor: 'lightblue',
              }}
              onClick={() => setIsFilterOpen(true)}>
              <h2 className='m-0 font-semibold cursor-pointer'>فلترة </h2>
              <Image
                src='/icons/filter.svg'
                alt='down arrow'
                width={22}
                height={22}
              />
            </div>

            {/* Filter Panel hidden by default its state: isOpen */}
            <FilterGroupModal
              filterBuses={filterBuses}
              setFilterBuses={setFilterBuses}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              filteredTrips={filteredTrips}
            />

            <div className=' items-start justify-start '>
              <Swiper
                style={{
                  overflowY: 'visible',
                  position: 'fixed',
                }}
                freeMode={true}
                grabCursor={true}
                spaceBetween={8}
                mousewheel={{
                  invert: false,
                }}
                slidesPerView={'auto'}
                modules={[FreeMode, Mousewheel]}>
                <SwiperSlide style={{ width: 'auto' }}>
                  <div
                    className='rounded-full  px-3 flex items-center justify-center  h-[30px]'
                    style={{ backgroundColor: 'lightblue' }}>
                    {/* Component */}
                    <SortDropdown
                      selectedSort={selectedSort}
                      setSelectedSort={setSelectedSort}
                      sortList={sortList}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide style={{ width: 'auto' }}>
                  <div
                    className='rounded-full px-3 flex items-center justify-center h-[30px]'
                    style={{ backgroundColor: 'lightblue' }}>
                    <h2 className='m-0 mr-1'>نوع الباص </h2>
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
                    <h2 className='m-0 mr-1'>وقت المغادرة (1)</h2>
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

      <section className=' w-full h-full px-4'>

        <div className='h-full w-full mt-4 md:flex md:justify-between '>
          <div className='hidden md:block sticky md:w-[35%] border-2 bg-white h-max mx-5 overflow-y-scroll scrollbar-hide'>
          <FilterGroup filteredTrips={filteredTrips}  filterBuses={filterBuses} setFilterBuses={setFilterBuses} />
          </div>

            {/* Trips Component */}
            {finalFilteredTrips.length !== 0 ? (
              finalFilteredTrips.map((trip: any, index) => (
                <div className='w-full md:w-[65%] overflow-y-auto h-screen'>
                    <div
                      className='flex items-center rounded-xl border border-slate-200	p-2 mb-3 gap-2'
                      style={{ backgroundColor: 'azure' }}>
                      <Image
                        src='/icons/busFrontView.svg'
                        alt='bus front View'
                        width={20}
                        height={20}
                      />
                      <h2 className='m-0 text-xs font-[Inter] text-gray-500 font-light '>
                        <strong className='font-semibold text-black'>
                          {finalFilteredTrips.length}
                        </strong>{' '}
                        باص وجد, تبدا من{' '}
                        <strong className='font-semibold text-black'>
                          {minimumTrip}ر.ي {' '}
                        </strong>{' '}
                        على الراكب
                      </h2>
                    </div>

                <Link href={`/bus_list/${trip.id}`} key={index}>
                  <TripBox
                    trip={trip}
                  />
                </Link>
                </div>
                
              )
              )
            ) : (
              <div className='w-full  h-screen overflow-hidden   md:w-[65%] flex flex-col items-center  justify-start mt-8'>
                <div className='w-4/12 max-w-xl flex justify-center'>
                  <Image
                    src='/images/busNotFound.png'
                    alt='bus not found'
                    width={300}
                    height={300}
                    // layout='responsive'
                  />
                </div>
                <h1 className='text-2xl font-bold leading-10  place-items-center mt-2 text-center text-black'>
                  لم يتم العثور على رحلات مطابقة لبحثك
                </h1>
              </div>
            )}
        </div>

      </section>
    </div>
  );
}

export default index;
