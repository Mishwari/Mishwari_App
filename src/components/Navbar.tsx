import React, { useState } from 'react'
import Image from 'next/image'
import SideMenu from './SideMenu'
import Link from 'next/link'
function Navbar() {
  const [ isBurgerOpen, setBurgerIsOpen ] = useState<boolean>(false);
  return (
      <div className='absolute z-10 flex justify-between items-center px-4 py-4 w-full max-w-6xl '>
        <button className='hidden md:block' onClick={() => setBurgerIsOpen(true)}>
          <Image width={15} height={15} src="./icons/burger_menu.svg" alt="burger_menu" className='h-6 w-6' />
        </button>
        <SideMenu isOpen={isBurgerOpen} setIsOpen={setBurgerIsOpen} />
        <div>
          <h1 className='text-[#ddf3ff] font-bold'>Mishwari</h1>
        </div>
        <Link href='/login' >
        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-[#005687]">
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        </Link>
      </div>   
  )
}

export default Navbar