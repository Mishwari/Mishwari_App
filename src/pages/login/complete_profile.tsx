import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { performRegister } from '@/store/actions/mobileAuthActions';
import { useRouter } from 'next/router';
import { AppState } from '../../store/store';
import { PencilSquareIcon   } from '@heroicons/react/24/outline'
import Link from 'next/link';
import TextInput from '@/components/TextInput';
import SwitchSlide from '@/components/SwitchSlide';
import ProfileForm from '@/components/ProfileForm';
import { Profile } from '@/types/profileDetails';



interface UserDataObject {
    username: string;
    full_name: string;
    email: string;
    age: string;
    gender: string;
}

function CompleteProfile() {
  const user = useSelector((state: AppState) => state.user);
  const authState = useSelector((state: AppState) => state.auth);

  const router = useRouter();
  const mobileNumber = useSelector((state: AppState) => state.mobileAuth.number);
  const [otpCode, setOtpCode] = useState<string>('')
  
  const [profileData, setProfileData] = useState<Profile>(
    {user: {
      id:null,
      email:'',
      username:'',
      first_name: '',
      last_name: '',
  },
  gender: "male" ,
  full_name: '',
  birth_date: '',
  address:''
}
);

// useEffect(() => {
//     if (authState.status !== 'partial', !authState.isAuthenticated ) {
//         router.push('/login'); 
//     }
// }, [authState.isAuthenticated, router]);

const updateProfileData = (path: string, value: any) => {
    setProfileData(prev => {
      const keys = path.split('.');
      let updatedData = { ...prev } as any; // Allow dynamic indexing
  
      let current = updatedData;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          current[key] = { ...current[key] };
          current = current[key];
        }
      });
  
      return updatedData;
    });
  };


console.log("user Data",profileData)
//   useEffect(() => {
//     if (!mobileNumber) {
//       router.push('/login'); // Redirect to the home page
//     }
//   }, [mobileNumber, router]);

    const dispatch = useDispatch();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        // if(mobileNumber && otpCode) {

            dispatch(performRegister(profileData,  router) as any);
        // }

    };

  return (
    <div className='flex  flex-col  h-screen sm:h-auto sm:mx-auto sm:w-full sm:max-w-sm px-6 sm:px-6  sm:py-4 mt-20 lg:px-8 sm:border border-blue-200 sm:rounded-xl bg-slate-50 '>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h1 className='mt-5 text-center text-2xl  font-bold leading-9 tracking-tight text-gray-600'>قم بادخال معلوماتك</h1>
        </div>
        <div className='flex-col justify-center text-center items-center'>
            <h1>اكمل معلوماتك الشخصية</h1>
            
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <ProfileForm
            profileData={profileData}
            updateProfileData={updateProfileData}
            handleSubmit={handleSubmit}
            />
        </div>
        <div className='flex-shrink-0 mb-10 flex underline justify-center'>تخطي</div>

    </div>
  )
}

export default CompleteProfile