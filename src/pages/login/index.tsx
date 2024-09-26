import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { performMobileLogin } from '@/store/actions/mobileAuthActions';
import { useRouter } from 'next/router';
import { AppState } from '../../store/store';
import TextInput from '@/components/TextInput';


function Login() {
  const getMobileNumber = useSelector((state: AppState) => state.mobileAuth.number);

  const user = useSelector((state: AppState) => state.user);
  console.log("user",user)

  const router = useRouter();
  const authState = useSelector((state: AppState) => state.auth);
  const [mobileNumber, setMobileNumber] = useState<string>('')

  useEffect(() => {
    if(getMobileNumber) {
      setMobileNumber(getMobileNumber);
    }
  },[getMobileNumber, router])
  
  useEffect(() => {
    if (authState.isAuthenticated && !getMobileNumber) {
      router.push('/'); // Redirect to the home page
    }
  }, [authState.isAuthenticated, router]);

    const dispatch = useDispatch();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        dispatch(performMobileLogin(mobileNumber, router) as any);

    };

  return (
    <div className='w-full bg-white'>

    <div className='flex min-h-full flex-col justify-center h-screen sm:h-auto sm:mx-auto sm:w-full sm:max-w-sm px-12 sm:px-6 py-8 sm:py-4 sm:mt-20 lg:px-8 sm:border border-blue-200 sm:rounded-xl bg-slate-100 '>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h1 className='mt-5 text-center text-2xl  font-bold leading-9 tracking-tight text-gray-600'>سجل دخولك  في مشواري</h1>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' onSubmit={handleSubmit}>

            {/* <div className='text-right'> 
                <label className='block text-sm font-medium leading-9 text-gray-900'> رقم الجوال</label>
                <div className='mt-2'>
                    <input type="string" size={10} maxLength={10} value={mobileNumber} onChange={(e)=> {setMobileNumber(e.target.value)}} required placeholder='ادخل رقم الجوال' className='block w-full text-lg font-bold border-b border-blue-800 py-1.5 bg-transparent text-gray-900 placeholder:text-gray-300 focus:border-b-2 focus:outline-none sm:text-sm sm:leading-6"' />
                </div>
            </div> */}
            <div>
              <TextInput
                value={mobileNumber}
                setValue={(value:string) => setMobileNumber( value)}
                title='رقم الجوال'
                placeholder='ادخل رقم الجوال'
              />
            </div>
            

            {/*pass */}
            {/* <div className='text-right'>  
                <label className='block text-sm font-medium leading-9 text-gray-900'>كلمة المرور</label>
                <div className='mt-2'>
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required placeholder='كلمة المرور' className='block w-full  border-b border-blue-800 py-1.5 bg-transparent text-gray-900 placeholder:text-gray-300 focus:border-b-2 focus:outline-none sm:text-sm sm:leading-6"' />
                </div>
            </div> */}
            <div className='flex-shrink-0 px-4 py-4 flex justify-center'>
                <button
                    type='submit'
                    className=' inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#005687] hover:bg-[#148ace] focus:outline-none '>
                   طلب رمز التحقق
                </button>
            </div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login