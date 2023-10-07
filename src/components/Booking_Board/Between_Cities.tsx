import React from 'react'
import Image from 'next/image'
function Between_Cities() {
  return (
    <div>
      <div className='flex gap-x-3'>
          <div className='border-2 border-[#005687] bg-[#cbd8df] w-20 h-14 rounded-lg overflow-hidden'>
            <Image alt='bike' src='/plane.svg' height={10} width={10} className=' h-16 w-64 object-center '/>
          </div>

          <div className='border-2 border-[#005687] bg-[#cbd8df] w-20 h-14 rounded-lg overflow-hidden'>
            <Image alt='bike' src='/bus.svg' height={10} width={10} className=' h-16  mb-6 w-20 object-center '/>
          </div>

          <div className='border-2 border-[#005687] bg-[#cbd8df] w-20 h-14 rounded-lg overflow-hidden'>
            <Image alt='bike' src='/bulka_bus.svg' height={1} width={1} className=' h-20 pt-4 w-64 object-center '/>
          </div>

          <div className='border-2 border-[#005687] bg-[#cbd8df] w-20 h-14 rounded-lg overflow-hidden'>
            <Image alt='bike' src='/car.svg' height={10} width={10} className=' h-16 w-64 object-center '/>
          </div>

          <div className='border-2 border-[#005687] bg-[#cbd8df] w-20 h-14 rounded-lg overflow-hidden'>
            <Image alt='bike' src='/bike.svg' height={10} width={10} className=' h-16 w-64 object-center '/>
          </div>
        </div>
    </div>
    
  )
}
export default Between_Cities