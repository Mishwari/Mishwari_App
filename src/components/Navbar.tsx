import React from 'react'
import Image from 'next/image'
function Navbar() {
  return (
      <div className='absolute z-10 flex justify-between items-center px-4 py-4 w-full max-w-6xl '>
        <div>
          <h1 className='text-white'>Logo</h1>
        </div>
        <div className='flex  items-center gap-x-6'>
          <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-[#005687]">
            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <Image alt='burgermenu' src='burgermwnu.svg' width={32} height={32} />
        </div>
      </div>   
  )
}

export default Navbar