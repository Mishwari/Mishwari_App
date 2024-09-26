import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Booking } from '@/types/booking';
import MiniTicket from '@/components/MiniTicket';
import BackButton from '@/components/BackButton';
import HeaderLayout from '@/layouts/HeaderLayout';
import MiniTicketSkeleton from '@/components/Skeletons/MiniTicketSkeleton';

function index() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/booking/getBooking/');
        console.log('bookings', response.data);
        setBookings(response.data);
        setFilteredBookings(response.data);
      } catch (err) {
        setError('Error getting bookings');
      } finally {
        setTimeout(() => {
          setLoading(false);
          
        }, 1000);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((booking) => booking.status === filter)
      );
    }
  }, [filter, bookings]);

  return (
    <main className='flex flex-col mt-0   w-full bg-scroll h-screen  bg-[#F4FAFE] '>
      <div className='fixed w-full top-0 z-20'>

      <HeaderLayout title='رحلاتي' />
      </div>
      <section className='bg-inherit scrollbar-hide'>
        <div className='sticky top-[62px] z-10 flex justify-around bg-inherit max-w-md  text-sm py-4 drop-shadow-lg '>
          <button
            onClick={() => setFilter('all')}
            className={` py-1.5 w-20  rounded-full text-center  font-bold ${
              filter == 'all' ? 'bg-[#005687] text-white' : 'bg-slate-200'
            }`}>
            الكل
          </button>
          <button
            onClick={() => setFilter('active')}
            className={` py-1.5 w-20 rounded-full text-center  font-bold ${
              filter == 'active' ? 'bg-[#005687] text-white' : 'bg-slate-200'
            }`}>
            نشط
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={` py-1.5 w-20  rounded-full text-center  font-bold ${
              filter == 'completed' ? 'bg-[#005687] text-white' : 'bg-slate-200'
            }`}>
            مكتمل
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={` py-1.5 w-20  rounded-full text-center  font-bold ${
              filter == 'cancelled' ? 'bg-[#005687] text-white' : 'bg-slate-200'
            }`}>
            ملغي
          </button>
        </div>
        <div className='flex flex-col gap-4 overflow-y-auto  mt-16 mx-4 bg-inherit mb-24  '>
          {loading ?   Array.from({ length: 6 }).map((_, index) => <MiniTicketSkeleton key={index} />)
          : filteredBookings.length > 0
          ? filteredBookings.map((booking: Booking, key) => (
            <MiniTicket
              key={key}
              booking={booking}
              />
            
          ))
          : 'No trips found.'  
            
      }
        </div>
        {/* <div className="mask h-24 w-32 bg-blue-700">
      <div className="">dgdg</div>
    </div> */}
      </section>
    </main>
  );
}

export default index;
