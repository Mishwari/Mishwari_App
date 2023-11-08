import React from 'react';
import Image from 'next/image';

interface TripProps {
  trip: {
    id: number;
    tripType: number;
    busName: string;
    pickup: string;
    destination: string;
    departure_time: string;
    arrival_time: string;
    cost: number;
    rate: number;
    bus_type: string;
    path: string;
    seats: number;
    features: {
      ac: boolean;
      wifi: boolean;
      charger: boolean;
    };
  };
}

function TripBox({ trip }: TripProps) {
  return (
    <div
      className='mt-2 justify-center sm:flex sm:gap-64 '
      style={{
        border: ' 0.5px solid #A4A4A4',
        borderRadius: '12px',
      }}>
      <div className='flex justify-between md:gap-9 items-center p-4'>
        <div>
          <h1 className='text-xl font-bold'>{trip.busName}</h1>
          <h5 className='text-sm font-light'>
            {trip.bus_type} - {trip.path}
          </h5>
        </div>
        <div
          className={`flex justify-center items-center rounded-xl px-1 py-0.5 h-[25px] w-[60px] ${
            trip.rate >= 3.5 ? 'bg-[#21C17A]' : ' bg-[#FFA400]'
          }`}>
          <Image
            src='/icons/star.svg'
            alt='star'
            height={25}
            width={25}
          />
          <h1 className='text-white font-black pr-1.5 '>{trip.rate}</h1>
        </div>
      </div>
      <div className='flex p-4 md:gap-9 justify-between'>
        <div className=''>
          <div className='flex gap-1 items-center'>
            <h1 className='text-lg font-bold'>
              {trip.departure_time} - {trip.arrival_time}
            </h1>
            <h1 className='text-sm font-light'>(9h 30m)</h1>
          </div>
          <div className='flex gap-4 pt-2'>
            {trip.features.ac ? (
              <Image
                src='/icons/airConditionar.svg'
                alt='wifi logo'
                height={15}
                width={15}
              />
            ) : null}
            {trip.features.wifi ? (
              <Image
                src='/icons/wifiIcon.svg'
                alt='wifi logo'
                height={15}
                width={15}
              />
            ) : null}

            {trip.features.charger ? (
              <Image
                src='/icons/mobileIcon.svg'
                alt='wifi logo'
                height={15}
                width={15}
              />
            ) : null}
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-black'>{trip.cost}YR</h1>
          <h1 className={`text-sm font-light text-center ${trip.seats < 5?'text-orange-600':''}	`}>
            {trip.seats
              ? trip.seats == 1
                ? trip.seats + ' Seat left'
                : trip.seats + ' Seats Left'
              : ''}{' '}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default TripBox;
