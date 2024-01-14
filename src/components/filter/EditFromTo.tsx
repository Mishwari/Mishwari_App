import React, { Fragment, useEffect, useRef,useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import FromToInputComponent from '../FromToInputComponent'
import Testdata from '../testdata.json'
import { useRouter } from 'next/router';

const list = Testdata.map(item => ({
  id: item.country_id,
  name: item.country_name
}));

interface EditFromToProps  {
  isEditFromTo:boolean;
  pickup:string;
  destination:string;
  setIsEditFromTo:any;

}

function EditFromTo({
  isEditFromTo,setIsEditFromTo,
  pickup,destination
  // ,setPickup,setDestination
}:EditFromToProps) {


  useEffect(() => {
    setLocalEditPickup(pickup)
    setLocalEditDestination(destination)
  },[pickup,destination])
  const [localEditPickup, setLocalEditPickup] = useState<string>('')
  const [localEditDestination, setLocalEditDestination] = useState<string>('')
  

const router = useRouter();

const handleEditSubmit =(e:React.FormEvent) => {
  // setPickup(localEditPickup)
  // setDestination(localEditDestination)
  
  setIsEditFromTo(false)
  if(pickup!=localEditPickup&&destination!=localEditDestination){}
  e.preventDefault();
  // if no changes no new get request will happen 
    router.push({
      pathname: '/bus_list',
      query: {
        tripType: 2,
        city: '',
        pickup: localEditPickup,
        destination: localEditDestination,
      },
    });
}

  return (

      <Transition appear show={isEditFromTo} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {setIsEditFromTo(false)}}>

            <div className="fixed inset-0 bg-black/50" />


          <div className="fixed inset-0 border-3 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  h-max overflow-scroll md:overflow-visible mt-auto md:m-auto md:relative  sm:max-w-[500px]   rounded-t-[50px] md:rounded-2xl bg-white   shadow-xl ">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-center mt-8 text-gray-900"
                  >
                    حدد نقطتي الانطلاق والوصول
                  </Dialog.Title>
                  <div className="mt-4 ">
                   <FromToInputComponent list={list} selectFrom={localEditPickup} setSelectFrom={setLocalEditPickup} selectTo={localEditDestination} setSelectTo={setLocalEditDestination} isEditFromTo={isEditFromTo}/>
                  </div>

                  <div className="m-4 mt-8 flex items-center justify-center">
                  <button type='submit' className='w-40 md:w-72 mt-4 py-2 border-2 border-slate-700 text-white bg-[#005687] rounded-lg'
                      onClick={handleEditSubmit}
                    >
                      موافق
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

  )
}

export default EditFromTo