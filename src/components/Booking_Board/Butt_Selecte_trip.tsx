import React, { useState } from 'react'
import Within_Cities from './Within_Cities'
import Between_Cities from './Between_Cities'
function Butt_Selecte_trip() {

  const [togglebtn, settogglebtn] = useState(1)

  const Togglebtn = (index: number) => {
    settogglebtn(index)
  }

  function renderButton() {
    if (togglebtn === 1) {
      return <Within_Cities />
    }
    else if (togglebtn === 2) {
      return <Between_Cities />
    }
  }
  return (
    <div className='py-6 px-2'>
      <div className='flex justify-between items-center bg-slate-100 rounded-3xl'>
        <button onClick={() => Togglebtn(1)} className={`text-[#005687] rounded-l-3xl h-12 w-28 ${togglebtn === 1 ? `bg-[#005687] text-white` : ``} `}>Within City</button>
        <button onClick={() => Togglebtn(2)} className={`text-[#005687] h-12 w-32  ${togglebtn === 2 ? `bg-[#005687] text-white` : ``}`}>Between Cities</button>
        <button className=' text-[#0055877b] rounded-r-3xl h-12 w-32 '>International</button>
      </div>
      <div className='rounded-3xl h-96 my-4 mx-2 border border-slate-600 text-white p-4'>
        {
          renderButton()
        }
      </div>
    </div>
  )
}

export default Butt_Selecte_trip