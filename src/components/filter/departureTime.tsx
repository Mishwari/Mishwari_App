import React from 'react'

function departureTime() {
  return (
    <div>
        <h1 className='font-bold'>Departue From  AL-Mukalla</h1>
        <div className='flex items-center gap-x-2 py-4'>
            <div className='border border-slate-400 p-2 rounded-lg w-fit flex flex-col justify-center items-center '>
                <img src="/icons/Morning.svg" alt="massbus" className='h-8 w-8 ' />
                <p className='text-base pt-1'>Morning</p>
            </div>

            <div className='border border-slate-400 p-2 rounded-lg w-fit flex flex-col justify-center items-center '>
                <img src="/icons/Evening.svg" alt="massbus" className='h-8 w-8 s' />
                <p className='text-base pt-1'>Night</p>
            </div>

        </div>
            <p className=' border-b border-slate-500 h-2 w-full'></p>
    </div>
  )
}

export default departureTime