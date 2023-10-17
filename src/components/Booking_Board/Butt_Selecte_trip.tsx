import React, { useState } from 'react'
import Within_Cities from './Within_Cities'
import Between_Cities from './Between_Cities'
import { Tab, Tabs } from '@nextui-org/react'
function Butt_Selecte_trip() {
  const [togglebtn, settogglebtn] = useState('1')

  const Togglebtn = (index: string) => {
    settogglebtn(index)
  }

  function renderButton() {
    if (togglebtn === '1') {
      return <Within_Cities />
    }
    else if (togglebtn === '2') {
      return <Between_Cities />
    }
  }
  return (
    <div className='py-6 px-2 w-full'>
      {/* <div className=' bg-slate-100 rounded-2xl flex justify-between gap-x-2 items-center p-1 border border-slate-300'>
        <button onClick={() => Togglebtn('1')} className={`text-[#005687] w-20 grow p-2 rounded-xl h-12 ${togglebtn === '1' ? `bg-[#005687] text-white` : ``} `}>Within City</button>
        <button onClick={() => Togglebtn('2')} className={`text-[#005687] w-20 grow rounded-xl h-12 ${togglebtn === '2' ?`bg-[#005687] text-white` : ``}`}>Between Cities</button>
        <button className=' text-[#0055877b] rounded-xl h-12 w-20 grow border border-slate-200'>International</button>
      </div> */}
      <Tabs aria-label="Options" classNames={{tabContent : 'text-primary'}} color='primary' onSelectionChange={settogglebtn as any} fullWidth className='w-full' disabledKeys={['3']}>
        <Tab start key="1" title="Within City"></Tab>
        <Tab key="2" title="Between Cities"></Tab>
        <Tab key="3"  title="International"></Tab>
      </Tabs>
      <div>
        {renderButton()}
      </div>
    </div>
  )
}

export default Butt_Selecte_trip