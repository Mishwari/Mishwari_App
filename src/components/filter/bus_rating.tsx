import React from 'react'

function bus_rating() {
  return (
    <div>
        <h1 className='font-bold pt-6'>Bus Rating</h1>
        <div className='flex items-center gap-x-2 py-4'>
            <div className='border border-slate-400 p-2 rounded-full w-fit flex  justify-center items-center '>
                <img src="/icons/StarIcon.svg" alt="massbus" className='h-8 w-8 ' />
                <p className='text-base pt-1'>4 & above</p>
            </div>

            <div className='border border-slate-400 p-2 rounded-full w-fit flex  justify-center items-center '>
                <img src="/icons/StarIcon.svg" alt="massbus" className='h-8 w-8 ' />
                <p className='text-base pt-1'>3.5 & above</p>
            </div>
            <div className='border border-slate-400 p-2 rounded-full w-fit flex  justify-center items-center '>
                <img src="/icons/StarIcon.svg" alt="massbus" className='h-8 w-8 ' />
                <p className='text-base pt-1'>2.5 & above</p>
            </div>

        </div>
            <p className=' border-b border-slate-500 h-2 w-full'></p>
    </div>
  )
}

export default bus_rating