import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import FlipButton from '@/components/FlipButton';
import TextInput from '@/components/TextInput';
import { Transition } from '@headlessui/react';
import { UserPlusIcon,MinusIcon   } from '@heroicons/react/24/outline'

import { useRouter } from 'next/router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { TripProps } from '@/components/TripBox';
import PassengerModal from '@/components/PassengerModal';

import { AppState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPassengers } from '@/store/actions/passengersActions';
import {
  setTrip,
  addPassenger,
  setAmount,
  deletePassenger,
  updatePassenger,
  checkPassenger,
} from '@/store/slices/bookingCreationSlice';
import { setSelectedTrip } from '@/store/slices/selectedTripSlice';
import { createBooking } from '@/store/actions/bookingActions';

import { Passenger } from '@/types/passenger';
import { Trip } from '@/types/trip';
import BackButton from '@/components/BackButton';
import HeaderLayout from '@/layouts/HeaderLayout';

const feature_list = [
  { 'شحن الجوال': true },
  { مكيف: true },
  { 'واي فاي': false },
];

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ContactDetailsObject {
  name: string;
  phone: string;
  email: string;
}

function trip_details() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state: AppState) => state.user?.userDetails);
  const passengers = useSelector((state: AppState) => state.bookingCreation.passengers);
  const router = useRouter();
  const dispatch = useDispatch();

  const [busDetailFlip, setBusDetailsFlip] = useState<boolean>(false);
  const [contactDetails, setContactDetails] = useState<ContactDetailsObject>({
    name: '',
    phone: '',
    email: '',
  });

  const [isAddPassenger, setIsAddPassenger] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [currentPassenger, setCurrentPassenger] = useState<Passenger | null>(
    null
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchPassengers() as any);
    }
  }, [user, dispatch]);

  useEffect(() => {
    // Add user details if not already in passengers list
    console.log('Pass');
    if (user) {
      const userExists = passengers.some(
        (passenger: Passenger) => passenger.name === user.username
      );
      // setTimeout(() => {

      if (!userExists) {
        const userPassenger: Passenger = {
          id: null,
          name: user?.username,
          email: user?.email || '',
          phone: user?.phone || '',
          age: user?.age || null,
          is_checked: true,
          gender: user?.gender || 'male',
          
        };
        dispatch(addPassenger(userPassenger) );
      }
      // },200)
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setContactDetails(() => {
        return {
          name: user?.username,
          phone: user?.phone,
          email: user?.email,
        };
      });
    }
  }, [user]); // no need for passengers dependency

  const handleContactDetailsInput = (name: string, value: any) => {
    setContactDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [tripDetails, setTripDetails] = useState<Trip>();

  const { tripId } = router.query;
  console.log(tripId);

  useEffect(() => {
    dispatch(setTrip(tripDetails as Trip));
  }, [tripDetails]);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}trips/${tripId}`);
        setTripDetails(response.data);
      } catch (err: any) {
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
    fetchTripDetails();
  }, [router.isReady, tripId]);

  const performCheck = (index: number) => {
    dispatch(checkPassenger(index));
  };

  const handleDeletePassenger = (index: number) => {
    console.log('handleDeletePassenger: ', index);
    dispatch(deletePassenger(index));
  };

  const handleAddPassenger = (passengerData: Passenger) => {
    console.log('handleAddPassenger: ', passengerData);
    dispatch(addPassenger(passengerData));
  };

  const handleEditPassenger = (passenger: Passenger, index: any) => {
    console.log('handleEditPassengerIndex: ', index);

    dispatch(updatePassenger({ index, passenger }));
  };

  const openAddPassengerModal = () => {
    setCurrentPassenger(null);
    console.log('edit current passenger', currentPassenger);
    setIsEdit(false);
    setIsAddPassenger(true);
  };

  const openEditPassengerModal = (index: number) => {
    setCurrentPassenger(passengers[index]);
    setEditIndex(index);
    console.log('edit current passenger', currentPassenger);
    setIsEdit(true);
    setIsAddPassenger(true);
  };
  const handleSubmitBooking = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createBooking(stripe) as any);
  };

  

  return (
    <main className='flex  flex-col m-0 mb-0 bg-[#F4FAFE] bg-scroll h-screen '>
      <HeaderLayout title={tripDetails?.main_trip?.driver?.operator?.name || 'اسم الرحلة'} />

      <section className=' mx-4 mt-4 p-4 bg-white shadow-lg  text-[#042F40] rounded-xl'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col text-center gap-1'>
            <h1 className='text-lg font-bold '>{tripDetails?.pickup.city}</h1>
            <p className='text-sm font-light'>3:00 صباحاً</p>
          </div>
          <div className='flex flex-col justify-center items-center '>
            <h1 className='text-xs'>7 س 32 د</h1>
            <div className='relative arrow h-[0.5px] w-[60px] bg-black mt-3 '>
              <div className='absolute rotate-45 -left-[1px] top-1 w-[10px] h-[0.5px] bg-black'></div>
              <div className='absolute -rotate-45 -left-[1px] -top-1 w-[10px] h-[0.5px] bg-black'></div>
            </div>
          </div>

          <div className='flex flex-col text-center gap-1'>
            <h1 className='text-lg font-bold'>
              {tripDetails?.destination.city}
            </h1>
            <p className='text-sm font-light'>6:00 مساءاً</p>
          </div>
        </div>
        <div className='flex justify-start items-center gap-2 py-4 '>
          <h1 className=' font-bold'>المسار:</h1>
          <h1 className=' flex'>
            <p> {tripDetails?.path_road} </p> - <p> 6 نقاط توقف</p>
          </h1>
          <FlipButton />
        </div>
        <div className='flex gap-2'>
          <h1 className='font-bold'>السعر: </h1>
          <h1 className=' '>{tripDetails?.price} ريال</h1>
          <h1 className='mx-auto'>({Math.round(tripDetails?.distance)} كم)</h1>
        </div>
      </section>

      <div className='flex justify-start items-center gap-2 mx-4 mt-6 py-4 '>
        <h1 className='text-lg font-bold'>معلومات الباص</h1>
        <FlipButton
          flip={busDetailFlip}
          setFlip={setBusDetailsFlip}
        />
      </div>

      <section
        className={` relative  mx-4  shadow-sm  text-[#042F40] rounded-xl transition-transform delay-300 `}>
        <div
          className={`  h-4 w-full p-4 rounded-xl bg-white shadow-lg   ${
            !busDetailFlip ? 'hidden' : 'visible'
          }`}></div>
        <Transition
          enter='transform transition ease-in-out '
          enterFrom='opacity-0 -gtranslate-y-full'
          enterTo='opacity-100 -gtranslate-y-0'
          leave='transform transition ease-in-out '
          leaveFrom='opacity-100 -gtranslate-y-0'
          leaveTo='opacity-0 -gtranslate-y-full'
          show={!busDetailFlip}>
          <div className=' z-10 h-full p-4 bg-white rounded-xl shadow-lg'>
            <div className='flex justify-between items-center'>
              <h1 className='font-bold'>
                {' '}
                باص: {tripDetails?.main_trip?.driver?.operator?.name}
              </h1>
              <div
                className={`flex justify-center items-center rounded-xl px-1 py-0.5 h-[25px] w-[60px] ${
                  Number(tripDetails?.main_trip?.driver?.driver_rating) >= 3.5
                    ? 'bg-[#21C17A]'
                    : ' bg-[#FFA400]'
                }`}>
                <h1 className='text-white font-black pr-1 '>
                  {tripDetails?.main_trip?.driver?.driver_rating?.slice(0, 3)}
                </h1>
                <Image
                  src='/icons/star.svg'
                  alt='star'
                  height={25}
                  width={25}
                />
              </div>
            </div>
            <div className='flex flex-wrap justify-start items-center gap-2 mt-4'>
              {feature_list &&
                feature_list.map((item, index) => (
                  <div key={index}>
                    {Object.values(item)[0] && (
                      <div className='flex justify-center items-center text-center text-[#747474] text-xs font-bold gap-1.5 px-3 bg-[#e7f0f680] shadow rounded-2xl '>
                        <h1>{Object.keys(item)[0]}</h1>
                        <Image
                          src='/icons/greenCheck.svg'
                          alt='phone'
                          height={15}
                          width={15}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div>
              <h1 className='flex flex-wrap gap-1 mt-6'>
                <strong>نوع الباص: </strong>
                <p>{tripDetails?.main_trip?.bus?.bus_type}</p>
                <strong className='mr-4'>السائق : </strong>
                <p>{tripDetails?.main_trip?.driver?.d_name}</p>
              </h1>
            </div>
          </div>
        </Transition>
      </section>

      <div className='flex justify-start items-center gap-2 mx-4  mt-4 py-4 '>
        <h1 className='text-lg font-bold'>معلومات التواصل</h1>
      </div>
      <section className='flex flex-col mx-4 p-4 bg-white shadow-lg  text-[#042F40] rounded-xl'>
        <div>
          <TextInput
            value={contactDetails.name}
            setValue={(value: string) =>
              handleContactDetailsInput('name', value)
            }
            title='الاسم'
            placeholder='اسم الراكب'
          />
        </div>
        <div>
          <TextInput
            value={contactDetails.phone}
            setValue={(value: string) =>
              handleContactDetailsInput('phone', value)
            }
            title='رقم الجوال'
            placeholder=''
          />
        </div>
        <div>
          <TextInput
            value={contactDetails.email}
            setValue={(value: string) =>
              handleContactDetailsInput('email', value)
            }
            title='الايميل'
            placeholder=' '
          />
        </div>
      </section>

      <div className='flex justify-start items-center gap-2 mx-4  mt-4 py-4 '>
        <h1 className='text-lg font-bold'>عدد الركاب </h1>
        <div
          className='text-3xl font-bold text-gray-600 mr-auto pl-2'
          onClick={openAddPassengerModal}>
          <UserPlusIcon className='h-6 w-6 font-bold ' />
        </div>
      </div>
      <section className='flex flex-col gap-3 mx-4 mb-2 p-4 bg-white shadow-lg  text-[#042F40] rounded-xl'>
        {passengers?.map((passenger: Passenger, key: number) => (
          <div
            key={key}
            className='flex justify-start items-center gap-2 px-2 '>
              <div
              onClick={() => handleDeletePassenger(key)}
              className='h-1 w-4 bg-red-600 rounded ml-2 '>
              
            </div>
            
            <input
              type='checkbox'
              checked={passenger.is_checked}
              onChange={() => performCheck(key)}>
              
            </input>
            <h1 className='font-bold'>{passenger.name}</h1>
            <div
              className='  mr-auto '
              onClick={() => openEditPassengerModal(key)}>
              <Image
                src='/icons/editIcon-black.svg'
                alt='edit'
                width={15}
                height={15}
              />
            </div>
            
          </div>
        ))}
      </section>
      <PassengerModal
        setIsAddPassenger={setIsAddPassenger}
        isAddPassenger={isAddPassenger}
        passenger={currentPassenger}
        isEdit={isEdit}
        handleOperation={
          isEdit
            ? (data: Passenger) => handleEditPassenger(data, editIndex)
            : handleAddPassenger
        }
        key={currentPassenger?.id}
      />

      {/* footer */}
      <footer className='sticky flex justify-between items-center bottom-0  mt-auto p-3 bg-[#dfedfa] w-full'>
        {/* <div
          onClick={handleSubmitBooking}
          className='  px-2 py-1 w-max rounded-sm justify-start  items-start text-center bg-[#21C17A] cursor-pointer hover:brightness-105 active:brightness-110 transition ease-in-out duration-200'>
          <h1 className='text-white text-center font-bold '>اكمل الحجز </h1>
          
        </div> */}
        <div className='flex justify-between gap-1 items-center '>
          <h1>الاجمالي: </h1>
          {/* TODO: useEffect to store total amount in redux */}
          <strong>{passengers.filter((obj: { is_checked: boolean; })  => obj.is_checked).length * Number(tripDetails?.price)}  </strong>
          <h1 className=''> ريال</h1>
        </div>
        <Link href='/checkout/payment'>
          {/* <CardElement /> */}
          <button className='px-3 py-1 text-white rounded bg-[#21C17A]' type="submit" > 
          الانتقال لصفحة الدفع
            {/* {loading ? 'Processing...' : 'Pay'} */}
          </button>
      </Link>
      </footer>
    </main>
  );
}

export default trip_details;
