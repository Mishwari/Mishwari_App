import React, { useState } from 'react';
import SwitchSlide from './SwitchSlide';
import TextInput from './TextInput';
import { Profile } from '@/types/profileDetails';



interface ProfileDataProps {
  profileData:  Profile;
  updateProfileData: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProfileForm: React.FC<ProfileDataProps> = ({ profileData, updateProfileData, handleSubmit }) => {




  return (
    <div>
      <form
        className='space-y-6'
        onSubmit={handleSubmit}>
        <TextInput
          value={profileData.user.username}
          setValue={(value: string) => updateProfileData('user.username', value)}
          title='اسم المستخدم  '
          placeholder='ادخل اسم المستخدم  '
        />

        <TextInput
          value={profileData.full_name}
          setValue={(value: string) => updateProfileData('full_name', value)}
          title='اسمك الكامل'
          placeholder='ادخل اسمك الكامل'
        />

        <TextInput
          value={profileData.user.email}
          setValue={(value: string) => updateProfileData('user.email', value)}
          title='الايميل'
          placeholder='ادخل الايميل'
        />

        <div className='flex mt-4 justify-start gap-4 items-center '>
          {/* <div className='w-1/4'>
            <TextInput
              value={profileData?.age}
              setValue={(value: string) => updateUserData('age', (value))}
              title='العمر'
              placeholder=''
              type='number'
            />
          </div> */}
          <div className='w-1/2 mx-auto mt-auto '>
            <SwitchSlide
              initial={profileData.gender}
              setInitial={(value: string) => updateProfileData('gender', value)}
            />
          </div>
        </div>

        <div className='flex-shrink-0 px-4 mt-auto flex justify-center'>
          <button
            type='submit'
            className=' inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#005687] hover:bg-[#148ace] focus:outline-none '>
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
