import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { HomeIcon, PencilSquareIcon , UserIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { resetAuthState } from '@/store/slices/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import BackButton from '@/components/BackButton';
import HeaderLayout from '@/layouts/HeaderLayout';
import { useSelector } from 'react-redux';
import { AppState } from '@/store/store';



function index() {

  const profile = useSelector((state: AppState) => state.profile);
  const router = useRouter();
  const dispatch = useDispatch()
  const performLogout = () => {
    const waitingLogout = toast.info('جاري تسجيل الخروج...',{
      autoClose: false
    })
    dispatch(resetAuthState())
    toast.dismiss(waitingLogout);
    router.push('/login');
    toast.success('تم تسجيل الخروج بنجاح  ',{
      autoClose:2000,
      hideProgressBar: true,
    })

  }

  return (
    <main  className='h-screen bg-scroll flex flex-col'>
        <HeaderLayout title='معلومات الحساب' >

      {profile &&
      <div className='flex justify-between p-4 mt-2'>
          <div className='flex gap-4'>
              <div className='bg-white w-max h-max rounded-full '>
                  <UserIcon className='text-[#005687] m-2 h-10 w-10'/>
              </div>
              <div className='flex flex-col justify-around text-white'>
                  <span className=' text-lg font-bold'>
                  {profile? profile.full_name : 'لا يوجد اسم'}
                  </span>
                  <span className='text-sm'>
                      {profile?.user.email !== "" || null ? profile.user.email   : 'لايوجد ايميل'}
                  </span>
              </div>
          </div>
          <Link href="/profile/edit">
          <div className='flex h-max flex-col justify-center'>
              <PencilSquareIcon className='text-white h-6 w-6 ' />
          </div>
          </Link>
        </div>
        }

        </HeaderLayout>
      <section className='mt-2 bg-gray-200 flex  flex-col'>
        <div className='flex flex-col gap-1 justify-center items-center 
        [&>*]:px-5 [&>*]:text-lg [&>*]:text-start [&>*]:font-semibold [&>*]:w-full [&>*]:h-max [&>*]:p-2 [&>*]:bg-white 
        '>
        <Link  href='/my_trips'> رحلاتي </Link>

        <Link  href='/profile/wallet'
        className='flex justify-between '
        >
           <p>المحفظة</p><span className='text-sm text-green-500  self-center font-semibold ml-4'>324000 YR</span> </Link>

        <Link  href='/my_trips'> قائمة الركاب </Link>

        <Link  href='/my_trips'> العروض </Link>
   
        <Link  href='/my_trips'>الشروط و الاحكام </Link>

        <Link  href='/my_trips'> من نحن </Link>

        <button type='button' onClick={performLogout}>  تسجيل الخروج </button>

        <div className='  ' />
        </div>
      </section>
      <div className='bg-white h-full'>

      </div>
    </main>
  )
}

export default index