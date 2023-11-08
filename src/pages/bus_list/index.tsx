import React, { useEffect, useState, useRef, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import Trips from '../api/trips.json';
import TripBox from '@/components/TripBox';
import SortDropdown from '@/components/filters_bar/SortDropdown';
import { useRouter } from 'next/router';
import FilterGroup from '@/components/filter/FilterGroup';
import axios from 'axios';

export type SortItem = {
  id: number;
  name: string;
};

function index() {

  useEffect(() => {
    // Define your pickup and destination
    const pickup = 'SYN';
    const destination = 'ATQ';

    // Construct the API endpoint with query parameters
    const apiUrl = `http://localhost:8000/api/trips/?pickup=${pickup}&destination=${destination}`;

    // Function to fetch trips
    const fetchTrips = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data); // Set the trips in state
      } catch (err) {
        console.log("Error Message: ",err.message); // Set error in state if request fails
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Error response:", err.response.data);
          console.error("Error response status:", err.response.status);
          console.error("Error response headers:", err.response.headers);
        } else if (err.request) {
          // The request was made but no response was received
          console.error("Error request:", err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", err.message);
        }
      }
    };

    // Invoke the function to fetch trips
    fetchTrips();
  }, []); 


  let [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const [pickup, setPickup] = useState<string>('Unknown');
  const [destination, setDestination] = useState<string>('Unknown');
  const [tripType, setTripType] = useState<number>(0);

  const [filteredTrips, setFilteredTrips] = useState<any[]>([]);//9 ref

  const [finalFilteredTrips, setFinalFilteredTrips] = useState<object[]>([]);

  const [filterBuses, setFilterBuses] = useState<{
    [key: string]: string[] | number[];
  }>({
    BusType: [],
    Departure: [],
    Rating: [],
  });

  const sortList = [
    { id: 1, name: 'Departure Time' },
    { id: 2, name: 'Cheapest' },
    { id: 3, name: 'Arrival Time' },
    { id: 4, name: 'Top Rated' },
  ];
  const [selectedSort, setSelectedSort] = useState<SortItem>(sortList[0]);

  // Filters

  const router = useRouter();
  useEffect(() => {
    if (router.query.pickup && router.query.destination) {
      setPickup(router.query.pickup as string);
      setDestination(router.query.destination as string);
    }
    if (router.query.tripType) {
      setTripType(Number(router.query.tripType));
    }
  }, [router.query]);

  useEffect(() => {
    let newFilteredTrips = []; // axios
    for (let i = 0; i < Trips.length; i++) { // not required "already filtered"
      if (Trips[i].pickup == pickup && Trips[i].destination == destination) {
        newFilteredTrips.push(Trips[i]);
      }
    }
    setFilteredTrips(newFilteredTrips);
  }, [pickup, destination]);


  useEffect(() => {
    let newFinal = [];
    for (let i = 0; i < filteredTrips.length; i++) {
      if (
        ((filterBuses.BusType.length === 0) || filterBuses.BusType.includes(filteredTrips[i].bus_type)) &&
        ((filterBuses.Rating.length === 0) || (filteredTrips[i].rate > Math.min(...filterBuses.Rating)))
      ) {
        newFinal.push(filteredTrips[i]);
      }
    }
    setFinalFilteredTrips(newFinal);
  }, [filteredTrips, filterBuses]);

  useEffect(() => {
    if (selectedSort.id == 1) {

    } else if (selectedSort.id == 2) {
      const sortedTrips = [...filteredTrips].sort((a, b) => a.cost - b.cost);
      setFilteredTrips(sortedTrips);
    }
    //rate
    else if (selectedSort.id == 4) {
      const sortedTrips = [...filteredTrips].sort((a, b) => b.rate - a.rate);
      setFilteredTrips(sortedTrips);
    }
  }, [selectedSort]);

  return (
    <div  className='flex flex-col items-center '>
      <div className=' sticky top-0 w-full z-10 max-w-5xl bg-white'>
        <section className='my-2'>
          <div className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4 pt-1'>
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
                    : tripType == 2
                    ? 'Between Cities'
                    : 'Unknown'}
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
              }}
              onClick={() => setIsFilterOpen(true)}>
              <Image
                src='/icons/filter.svg'
                alt='down arrow'
                width={22}
                height={22}
              />
              <h2 className='m-0 '>Filters </h2>
            </div>

            {/* Filter Panel hidden by default its state: isOpen */}
            <FilterGroup
              filterBuses={filterBuses}
              setFilterBuses={setFilterBuses}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
            />

            <div className='items-start justify-start overflow-x-hidden '>
              <Swiper
                style={{
                  overflowY: 'visible',
                  position: 'absolute',
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

      <section className='m-3 max-w-5xl md:max-w-7xl'>
        <div
          className='flex items-center rounded-xl border border-slate-200	p-2 mb-3 gap-2' 
          style={{ backgroundColor:'azure' }}>
          <Image
            src='/icons/busFrontView.svg'
            alt='bus front View'
            width={20}
            height={20}
          />
          <h2 className='m-0 text-xs font-[Inter] text-gray-500 font-light '>
            <strong className='font-semibold text-black'>{finalFilteredTrips.length}</strong> Buses found, Starting from{' '}
            <strong className='font-semibold text-black'>10000YR</strong> per passenger
          </h2>
        </div>

        {/* Trips Component */}
        {finalFilteredTrips.length != 0 ? (
          finalFilteredTrips.map((trip: any, index) => {
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
    </div>
  );
}

export default index;
