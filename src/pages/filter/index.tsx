import React from 'react'
import Filteredcomponents from '/src/components/filter/comp_collection'
function index() {
  return (
    <div className='p-2'>
        <div className='flex items-center gap-x-2'>
          <img src="\icons\leftArrow.svg" alt="leftArrow" className='h-10 w-10'  />
          <h1 className=' font-bold'>Filter By</h1>
        </div>
        <Filteredcomponents/>
    </div>
  )
}

export default index