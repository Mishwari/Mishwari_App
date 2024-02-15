import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image';
import FlipButton from '@/components/FlipButton';
import TextInput from '@/components/TextInput';
import SwitchSlide from '@/components/SwitchSlide';
import { Transition } from '@headlessui/react';

const feature_list = [{"شحن الجوال" : true},{"مكيف":true},{"واي فاي":false}]

function trip_details() {
  const [busDetailFlip, setBusDetailsFlip] = useState<boolean>(false)
  const [cname, setCname]= useState<string>('')
  const [cage, setCage]= useState<number | undefined>()
  const [cgender, setCgender]= useState<boolean>(false)
  const [instructions, setInstructions]= useState<string>('')

  const collectedData = () => {
    let url ='https://wa.me/918904321026'
    let message = `*Trip*: Aden - Seyon\n*Name*: ${cname}\n*Age*: ${cage}\n*Gender*: ${cgender? 'Female' : 'Male'}\n*Instructions*: ${instructions}`
    url += `?text=${encodeURI(message)}`
    console.log(url)
    window.open(url)
  }


  return (
    <main className='flex  flex-col m-0  bg-[#F4FAFE] bg-scroll h-screen pb-4'>
      <header className='py-4 px-2 bg-[#005687]'>
        <div className='flex gap-2 text-xl text-white '>
          <Link href='/bus_list'>
                <Image
                  src='/icons/leftArrow_white.svg'
                  alt='leftArrow'
                  height={30}
                  width={30}
                  className='rotate-180 white'
                />
          </Link>
          <h1 className=''>بن سرهد للسفريات</h1>
        </div>
      </header>

      
      <section className=' mx-4 mt-4 p-4 bg-white shadow  text-[#042F40] rounded-xl'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col text-center gap-1'>
            <h1 className='text-lg font-bold '>
              سيئون
            </h1>
            <p className='text-sm font-light'>
              3:00 صباحاً
            </p>
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
              عدن
            </h1>
            <p className='text-sm font-light'>
              6:00 مساءاً
            </p>
          </div>
        </div>
        <div className='flex justify-start items-center gap-2 py-4 '>
          <h1 className=' font-bold'>
            المسار: 
          </h1>
          <h1 className=' '>
            الخط الساحلي - 6 نقاط توقف
          </h1>
          <FlipButton />
        </div>
        <div className='flex gap-2'>
          <h1 className='font-bold'>السعر: </h1>
          <h1 className=' '>30000 ريال</h1>
          <h1 className='mx-auto'>
            (123 كم)
          </h1>
        </div>
        
      </section>

      <div  className='flex justify-start items-center gap-2 mx-4 mt-6 py-4 '> 
        <h1 className='text-lg font-bold'>معلومات الباص</h1>
        <FlipButton flip={busDetailFlip} setFlip={setBusDetailsFlip}/>
      </div>

      

      <section className='flex flex-col mx-4  p-4 min-h-4 bg-white shadow-sm  text-[#042F40] rounded-xl overflow-hidden transition-transform duration-500 '>
        
        <Transition
         enter='transform transition ease-in-out duration-500 sm:duration-700'
         enterFrom='-translate-y-full'
         enterTo='-translate-y-0'
         leave='transform transition ease-in-out duration-500 sm:duration-700'
         leaveFrom='-translate-y-0'
         leaveTo='-translate-y-full'

        show={!busDetailFlip}

        >

        <div className='transition-trasform duration-700'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold'> باص بن سرهد للسفريات</h1>
            <div
              className={`flex justify-center items-center rounded-xl px-1 py-0.5 h-[25px] w-[60px] ${
                7 >= 3.5
                  ? 'bg-[#21C17A]'
                  : ' bg-[#FFA400]'
              }`}>
              <h1 className='text-white font-black pr-1 '>
                4.5
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

                    {(Object.values(item)[0] )   &&

                    (<div className='flex justify-center items-center text-center text-[#747474] text-xs font-bold gap-1.5 px-3 bg-[#e7f0f680] shadow rounded-2xl '>
    
                      <h1>{Object.keys(item)[0]}</h1>
                      <Image
                        src='/icons/greenCheck.svg'
                        alt='phone'
                        height={15}
                        width={15} 
                        />
                  </div>
                  )
                  }

                  </div>
                
              ))
                
              }
          </div>
          <div>
              <h1 className='flex flex-wrap gap-1 mt-6'>
                  <strong>نوع الباص: </strong>
                  <p>بلكة</p>
                  <strong className='mr-4'>رقم التواصل: </strong>
                  <p>77922462</p>
              </h1>
          </div>
        </div>
        </Transition>
        
      </section>


      <div  className='flex justify-start items-center gap-2 mx-4  mt-4 py-4 '> 
        <h1 className='text-lg font-bold'>معلومات الراكب</h1>
      </div>
      <section className='flex flex-col mx-4 p-4 bg-white shadow-sm  text-[#042F40] rounded-xl'>
        <div>
        <TextInput
         value={cname} setValue={setCname}
         title='الاسم' placeholder='اسم الراكب' />
        </div>
        <div className='flex mt-4 justify-start gap-4 items-center '>
            <div className='w-1/4'>

                <TextInput 
                 value={cage} setValue={setCage}
                title='العمر' placeholder='' type="number"/>
            </div>
            <div className='w-1/2 mx-auto mt-auto '>
                <SwitchSlide 
                initial={cgender} setInitial={setCgender}
                />
            </div>
        </div>
        <div className='flex mt-4'>
            <TextInput  
             value={instructions} setValue={setInstructions}
            title='ملاحظات للسائق' placeholder='مثال: مقابل قصر سيئون' type='textarea' />
        </div>
      </section>

      {/* footer */}
      <footer className="flex justify-center  items-center max-w-sm mx-auto mt-auto py-4 ">
        <div
        onClick={collectedData}
         className='flex gap-3 px-4 py-2 w-max rounded-2xl justify-center  items-center text-center bg-[#21C17A] cursor-pointer hover:brightness-105 active:brightness-110 transition ease-in-out duration-200'>

          <h1 className='text-white text-center font-bold text-lg'>احجز عبر واتساب</h1>
          <Image 
          src='/icons/whatsapp_svgrepo.com.svg'
          alt='whatsapp'
          height={30}
          width={30}
          
          />
        </div>
        
      </footer>

    </main>
  )
}

export default trip_details