import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';


function convertToReadableTime(isoString:string) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'مساءاً' : 'صباحاً';

  hours = hours % 12;
  hours = hours || 12; // the hour '0' should be '12'

  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
}

function calculateDuration(departure:any, arrival:any) {
  const departureDate:any = new Date(departure);
  const arrivalDate:any = new Date(arrival);

  const difference = arrivalDate - departureDate; // difference in milliseconds
  const hours = Math.floor(difference / 3600000); // convert milliseconds to hours
  const minutes = Math.floor((difference % 3600000) / 60000); // convert remaining milliseconds to minutes

  return `${hours}س ${minutes}د`;
}

interface TripProps {
  trip: {
    id: number;
    driver: {
      id: number;
      d_name: string;
      car_number: string;
      car_type: string;
      mobile_number: number;
      photo: string;
      car_photo: string;
      driver_rating: string;
      national_id: string;
      driver_license: string;
      is_ac: boolean;
      is_wifi: boolean;
      is_charger: boolean;
      user: number | object;
    } | null;
    tripType: number;
    pickup: string;
    destination: string;
    path_road: string;
    price: number;
    created_at: string;
    departure_time: string;
    arrival_time: string;
    trip_status: string;
    available_seats: number;
  };
}

function TripBox({ trip }: TripProps) {
  const formattedDepartureTime = convertToReadableTime(trip.departure_time);
  const formattedArrivalTime = convertToReadableTime(trip.arrival_time);
  const tripDuration = calculateDuration(
    trip.departure_time,
    trip.arrival_time
  );

  console.log("trip: ",trip)
  const router = useRouter();
  const handleTripClick = () => {
    router.push({
      pathname: '/bus_list/trip_details',
      query: {
        trip_id: trip?.id
      },
    });
  }

  return (
    <div
      onClick={handleTripClick}
      className='mt-3 justify-center sm:flex sm:gap-64 '
      style={{
        border: ' 0.5px solid #A4A4A4',
        borderRadius: '12px',
      }}>
      <div className='flex justify-between md:gap-9 items-center p-4'>
        <div className=''>
          <h1 className=' text-xl font-bold'>{trip.driver?.d_name}</h1>
          <h5 className='text-sm font-light'>
            {trip.driver?.car_type} - {trip.path_road}
          </h5>
        </div>
        <div
          className={`flex justify-center items-center rounded-xl px-1 py-0.5 h-[25px] w-[60px] ${
            Number(trip.driver?.driver_rating) >= 3.5
              ? 'bg-[#21C17A]'
              : ' bg-[#FFA400]'
          }`}>
          <h1 className='text-white font-black pr-1 '>
            {Number(trip.driver?.driver_rating)}
          </h1>
          <Image
            src='/icons/star.svg'
            alt='star'
            height={25}
            width={25}
          />
        </div>

      </div>
      <div className='flex p-4 gap-2 md:gap-9 justify-between'>
        <div className=''>
          <div className='flex gap-1 items-center'>
            <h1 className='font-bold'>
              {formattedDepartureTime} - {formattedArrivalTime}
            </h1>
            {/** duration: */}
            {/* <h1 className='text-sm font-light'>({tripDuration})</h1> */}
          </div>
          <div className='flex gap-4 pt-2'>
            {trip.driver?.is_ac ? (
              <Image
                src='/icons/airConditionar.svg'
                alt='wifi logo'
                height={15}
                width={15}
              />
            ) : null}
            {trip.driver?.is_wifi ? (
              <Image
                src='/icons/wifiIcon.svg'
                alt='wifi logo'
                height={15}
                width={15}
              />
            ) : null}

            {trip.driver?.is_charger ? (
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
          <h1 className='text-2xl  flex justify-center items-center gap-1 font-black'>{trip.price}<p className='text-xs'>ريال</p></h1>
          <h1
            className={`text-sm font-light text-center ${
              trip.available_seats < 5 ? 'text-orange-600' : ''
            }	`}>
            {trip.available_seats
              ? trip.available_seats > 1 && trip.available_seats < 11
                ? trip.available_seats + ' مقاعد متبقية'
                : trip.available_seats + ' مقعد متبقي'
              : ''}{' '}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default TripBox;
